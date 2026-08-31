import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { userStore } from '@/lib/auth/userStore';

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

    if (name && name.length >= 2) {
      user.name = name;
    }
    if (phone) {
      user.profile.phone = phone;
    }
    if (avatar) {
      user.profile.avatar = avatar;
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        studentId: user.profile.studentId,
        batch: user.profile.batch,
        phone: user.profile.phone,
        avatar: user.profile.avatar,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update profile details.' },
      { status: 500 }
    );
  }
}
