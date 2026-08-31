import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { userStore } from '@/lib/auth/userStore';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/security';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const payload = verifySessionToken(tokenCookie.value);
    if (!payload) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const user = await userStore.findUserByIdAsync(payload.userId);
    if (!user || user.status !== 'active') {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const sessionUser = userStore.toSessionUser(user);
    return NextResponse.json({ success: true, user: sessionUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, user: null }, { status: 500 });
  }
}
