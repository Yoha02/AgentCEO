import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCode, getUserProfile } from '@/lib/gmail';
import { cookies } from 'next/headers';

// GET /api/auth/callback/google - Handle OAuth callback
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      new URL(`/connections?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/connections?error=no_code', request.url)
    );
  }

  try {
    const tokens = await getTokensFromCode(code);
    
    // Store tokens in cookies (in production, use a database)
    const cookieStore = await cookies();
    
    if (tokens.access_token) {
      cookieStore.set('gmail_access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
      });
    }

    if (tokens.refresh_token) {
      cookieStore.set('gmail_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    // Get user profile
    const profile = await getUserProfile(tokens.access_token!, tokens.refresh_token || undefined);

    return NextResponse.redirect(
      new URL(`/connections?success=gmail&email=${encodeURIComponent(profile.emailAddress || '')}`, request.url)
    );
  } catch (err) {
    console.error('OAuth callback error:', err);
    return NextResponse.redirect(
      new URL('/connections?error=token_exchange_failed', request.url)
    );
  }
}
