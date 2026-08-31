import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth/security';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully.' },
    { status: 200 }
  );

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
