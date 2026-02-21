import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sendEmail } from '@/lib/gmail';
import { logWithTrace } from '@/lib/datadog';

// POST /api/gmail/send - Send an email (requires approval)
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
    const { to, subject, content, threadId, approved } = body;

    // Safety check: require explicit approval
    if (!approved) {
      return NextResponse.json(
        { error: 'Email must be explicitly approved before sending' },
        { status: 400 }
      );
    }

    if (!to || !subject || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, content' },
        { status: 400 }
      );
    }

    logWithTrace('info', 'Sending email with approval', { to, subject });

    // Send the email
    const result = await sendEmail(
      accessToken,
      refreshToken,
      to,
      subject,
      content,
      threadId
    );

    logWithTrace('info', 'Email sent successfully', { messageId: result.id });

    return NextResponse.json({
      success: true,
      messageId: result.id,
      threadId: result.threadId,
    });
  } catch (err) {
    logWithTrace('error', 'Failed to send email', { error: String(err) });
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
