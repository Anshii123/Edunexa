import { NextResponse } from 'next/server';
import { userStore } from '@/lib/auth/userStore';
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '@/lib/auth/security';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim()?.toLowerCase();
    const password = body.password;
    const role = body.role === 'admin' ? 'admin' : 'student';
    const phone = body.phone?.trim() || '';

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Full name must be at least 2 characters.' },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters in length.' },
        { status: 400 }
      );
    }

    // Check duplicate email
    const existing = await userStore.findUserByEmailAsync(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email address already exists. Please login.' },
        { status: 409 }
      );
    }

    // Create user in MongoDB Atlas
    const newUser = await userStore.createUserAsync({
      name,
      email,
      password,
      role,
      profile: { phone },
    });

    // Create session token
    const token = createSessionToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    const sessionUser = userStore.toSessionUser(newUser);

    const response = NextResponse.json(
      {
        success: true,
        message: 'Account registered successfully.',
        user: sessionUser,
      },
      { status: 201 }
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
      { success: false, error: error.message || 'An error occurred during registration.' },
      { status: 500 }
    );
  }
}
