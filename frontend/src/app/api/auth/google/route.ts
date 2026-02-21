import { NextRequest, NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/gmail';

// GET /api/auth/google - Redirect to Google OAuth
export async function GET(request: NextRequest) {
  const authUrl = getAuthUrl();
  return NextResponse.redirect(authUrl);
}
