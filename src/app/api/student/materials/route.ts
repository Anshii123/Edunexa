import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { db } from '@/lib/db/storage';

export async function GET(request: Request) {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please sign in.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const typeFilter = searchParams.get('type') || '';
  const search = searchParams.get('q') || '';

  const enrolledCourseIds = user.profile.enrolledCourses && user.profile.enrolledCourses.length > 0
    ? user.profile.enrolledCourses
    : ['course-1', 'course-2'];

  let materials = db.getStudentMaterials(enrolledCourseIds);

  if (typeFilter && typeFilter !== 'All') {
    materials = materials.filter(m => m.type.toLowerCase() === typeFilter.toLowerCase());
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    materials = materials.filter(
      m => m.title.toLowerCase().includes(q) || m.courseTitle.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    data: materials,
  });
}
