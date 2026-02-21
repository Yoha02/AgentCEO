import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET /api/health - Health check endpoint
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const hasGmailToken = !!cookieStore.get('gmail_access_token')?.value;

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      bedrock: {
        configured: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY),
        region: process.env.AWS_REGION || 'not set',
      },
      datadog: {
        configured: !!process.env.DD_API_KEY,
        service: process.env.DD_SERVICE || 'agentceo',
        env: process.env.DD_ENV || 'development',
      },
      gmail: {
        configured: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
        authenticated: hasGmailToken,
      },
    },
  };

  return NextResponse.json(health);
}
