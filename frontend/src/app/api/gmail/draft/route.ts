import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createDraft } from '@/lib/gmail';
import { generateDraftReply } from '@/lib/bedrock';
import { traceLLMCall, logWithTrace } from '@/lib/datadog';

// POST /api/gmail/draft - Generate and create a draft reply
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { originalEmail, tone = 'professional', threadId } = body;

    if (!originalEmail || !originalEmail.from || !originalEmail.subject) {
      return NextResponse.json(
        { error: 'Missing required fields: originalEmail with from, subject, body' },
        { status: 400 }
      );
    }

    logWithTrace('info', 'Generating draft reply', { tone, subject: originalEmail.subject });

    // Generate draft with AI
    const draftContent = await traceLLMCall(
      'generate_draft',
      'anthropic.claude-3-sonnet',
      () => generateDraftReply(originalEmail, tone)
    );

    // Create draft in Gmail
    const draft = await createDraft(
      accessToken,
      refreshToken,
      originalEmail.from,
      `Re: ${originalEmail.subject}`,
      draftContent,
      threadId
    );

    logWithTrace('info', 'Draft created successfully', { draftId: draft.id });

    return NextResponse.json({
      draft: {
        id: draft.id,
        content: draftContent,
        to: originalEmail.from,
        subject: `Re: ${originalEmail.subject}`,
      },
    });
  } catch (err) {
    logWithTrace('error', 'Failed to create draft', { error: String(err) });
    return NextResponse.json(
      { error: 'Failed to create draft' },
      { status: 500 }
    );
  }
}
