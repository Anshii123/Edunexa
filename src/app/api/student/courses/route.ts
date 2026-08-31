import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { db } from '@/lib/db/storage';

export async function GET() {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please sign in.' },
      { status: 401 }
    );
  }

  const enrolledCourseIds = user.profile.enrolledCourses && user.profile.enrolledCourses.length > 0
    ? user.profile.enrolledCourses
    : ['course-1'];

  const allCourses = db.getCourses();
  const enrolledCourses = allCourses.filter(c => enrolledCourseIds.includes(c.id)).map(course => ({
    ...course,
    progressPercent: 68,
    completedLessons: 42,
    totalLessons: 62,
    nextLiveSession: 'Tomorrow, 4:30 PM EST',
    assignedInstructor: 'Dr. Arthur Sterling',
  }));

  return NextResponse.json({
    success: true,
    data: enrolledCourses,
  });
}
