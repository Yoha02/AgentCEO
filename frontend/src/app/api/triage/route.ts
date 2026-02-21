import { NextRequest, NextResponse } from 'next/server';
import { triageEmail } from '@/lib/bedrock';
import { traceLLMCall, logWithTrace } from '@/lib/datadog';

// POST /api/triage - Triage a single email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, subject, body: emailBody } = body;

    if (!from || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: from, subject' },
        { status: 400 }
      );
    }

    logWithTrace('info', 'Triage request received', { subject });

    // Triage with AI
    const result = await traceLLMCall(
      'triage_email',
      'anthropic.claude-3-sonnet',
      () => triageEmail({ from, subject, body: emailBody || '' })
    );

    logWithTrace('info', 'Triage completed', { urgency: result.urgency });

    return NextResponse.json(result);
  } catch (err) {
    logWithTrace('error', 'Triage failed', { error: String(err) });
    return NextResponse.json(
      { error: 'Failed to triage email' },
      { status: 500 }
    );
  }
}
