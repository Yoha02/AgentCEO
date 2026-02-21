import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchEmails } from '@/lib/gmail';
import { triageEmail } from '@/lib/bedrock';
import { traceLLMCall, logWithTrace } from '@/lib/datadog';

// GET /api/gmail/emails - Fetch and triage emails
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('gmail_access_token')?.value;
    const refreshToken = cookieStore.get('gmail_refresh_token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated with Gmail' },
        { status: 401 }
      );
    }

    logWithTrace('info', 'Fetching emails from Gmail');

    // Fetch emails
    const emails = await fetchEmails(accessToken, refreshToken, 10);

    // Triage each email with AI
    const triagedEmails = await Promise.all(
      emails.map(async (email) => {
        try {
          const triage = await traceLLMCall(
            'triage_email',
            'anthropic.claude-3-sonnet',
            () => triageEmail({
              from: email.from,
              subject: email.subject,
              body: email.body,
            })
          );

          return {
            ...email,
            ...triage,
          };
        } catch (err) {
          logWithTrace('warn', 'Failed to triage email', { emailId: email.id });
          return {
            ...email,
            urgency: 'normal' as const,
            summary: email.snippet,
            whyItMatters: 'Email requires your attention',
            suggestedAction: 'Review and respond',
          };
        }
      })
    );

    // Sort by urgency
    const urgencyOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
    triagedEmails.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

    logWithTrace('info', 'Emails fetched and triaged', { count: triagedEmails.length });

    return NextResponse.json({ emails: triagedEmails });
  } catch (err) {
    logWithTrace('error', 'Failed to fetch emails', { error: String(err) });
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}
