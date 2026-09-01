import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { userStore } from '@/lib/auth/userStore';

import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '@/lib/auth/security';

export async function GET() {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please sign in.' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      studentId: user.profile.studentId || 'EDN-2026-0842',
      batch: user.profile.batch || 'STEM 2026-28 Batch Alpha',
      phone: user.profile.phone || '+1 (555) 234-5678',
      department: user.profile.department || 'School of Advanced STEM',
      avatar: user.profile.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    },
  });
}

export async function PUT(request: Request) {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please sign in.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const avatar = body.avatar?.trim();

    const updatedUser = await userStore.updateUserProfileAsync(user.id, { name, phone, avatar });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'User profile not found.' },
        { status: 404 }
      );
    }

    // Refresh session token so header/cookie has new user name
    const token = createSessionToken({
      userId: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      name: updatedUser.name,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        studentId: updatedUser.profile?.studentId || 'EDN-2026-0842',
        batch: updatedUser.profile?.batch || 'STEM 2026-28 Batch Alpha',
        phone: updatedUser.profile?.phone || '',
        avatar: updatedUser.profile?.avatar || '',
      },
    });

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
    console.error('CRITICAL PROFILE UPDATE ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update profile details.' },
      { status: 500 }
    );
  }
}
