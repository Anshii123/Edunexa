import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { db } from '@/lib/db/storage';

export async function GET() {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please sign in to access the Student Portal.' },
      { status: 401 }
    );
  }

  const allCourses = db.getCourses();
  const enrolledCourseIds = user.profile?.enrolledCourses && user.profile.enrolledCourses.length > 0
    ? user.profile.enrolledCourses
    : ['course-1']; // default active cohort for demo student

  const enrolledCourses = allCourses.filter(c => enrolledCourseIds.includes(c.id));
  const materials = db.getStudentMaterials(enrolledCourseIds);
  const notices = db.getNotices().filter(n => n.targetAudience === 'All' || n.targetAudience === 'Students');
  const events = db.getEvents();

  const studentProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    studentId: user.profile.studentId || 'EDN-2026-0842',
    batch: user.profile.batch || 'STEM 2026-28 Batch Alpha',
    phone: user.profile.phone || '+1 (555) 234-5678',
    avatar: user.profile.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 96.5,
    overallScore: 92.4,
    modulesCompleted: 8,
    totalModules: 12,
    badges: ['Top 1% Ranker', 'Olympiad Qualifier', 'Perfect Attendance'],
    enrolledCoursesCount: enrolledCourses.length,
  };

  return NextResponse.json({
    success: true,
    data: {
      profile: studentProfile,
      enrolledCourses,
      recentMaterials: materials.slice(0, 4),
      recentNotices: notices.slice(0, 4),
      upcomingEvents: events.slice(0, 2),
    },
  });
}
