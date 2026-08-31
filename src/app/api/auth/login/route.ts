import { NextResponse } from 'next/server';
import { userStore } from '@/lib/auth/userStore';
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '@/lib/auth/security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.trim()?.toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await userStore.findUserByEmailAsync(email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Verify hashed password
    const isPasswordValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Check account status
    if (user.status !== 'active') {
      return NextResponse.json(
        { success: false, error: `Account is currently ${user.status}. Please contact the institute admin.` },
        { status: 403 }
      );
    }

    userStore.updateLastLogin(user.id);

    // Create session token
    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const sessionUser = userStore.toSessionUser(user);

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful.',
        user: sessionUser,
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'An error occurred during login authentication.' },
      { status: 500 }
    );
  }
}
