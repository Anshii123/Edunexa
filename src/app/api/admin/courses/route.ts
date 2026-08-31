import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { dbService } from '@/lib/db/service';

export async function GET(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const level = searchParams.get('level') || undefined;
    const search = searchParams.get('search') || searchParams.get('q') || undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 50;

    const result = await dbService.getCourses({
      category,
      level,
      search,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch courses.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.duration) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: Title, category, and duration are required fields.' },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newCourse = await dbService.createCourse({
      title: body.title.trim(),
      slug,
      subtitle: body.subtitle?.trim() || '',
      shortDescription: body.shortDescription?.trim() || body.description?.trim() || '',
      fullDescription: body.fullDescription?.trim() || body.description?.trim() || '',
      category: body.category,
      level: body.level || 'Comprehensive',
      duration: body.duration,
      eligibility: body.eligibility || 'Standard admission criteria',
      mode: body.mode || 'Hybrid (Classroom + Live)',
      schedule: body.schedule || 'Flexible schedules',
      certification: body.certification || 'EduNexa Certification of Excellence',
      badge: body.badge || 'New Cohort',
      rating: body.rating || 5.0,
      reviewsCount: body.reviewsCount || 0,
      enrolledCount: body.enrolledCount || 0,
      fee: Number(body.fee) || 2500,
      discountedFee: body.discountedFee ? Number(body.discountedFee) : undefined,
      featured: Boolean(body.featured),
      active: body.active !== undefined ? Boolean(body.active) : true,
      thumbnail:
        body.thumbnail ||
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      highlights: body.highlights || ['Comprehensive syllabus coverage', '1-on-1 faculty mentorship'],
      learningOutcomes: body.learningOutcomes || ['Master core concepts', 'Exam problem solving'],
      prerequisites: body.prerequisites || ['Basic foundational understanding'],
      targetAudience: body.targetAudience || 'Competitive entrance aspirants',
      syllabus: body.syllabus || [],
      facultyIds: body.facultyIds || ['fac-1'],
      upcomingBatchDate: body.upcomingBatchDate || '2026-10-01',
    });

    return NextResponse.json(
      { success: true, message: 'Course created successfully.', data: newCourse },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to create course.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Validation Error: Course ID is required.' }, { status: 400 });
    }

    const updated = await dbService.updateCourse(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Course not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Course updated successfully.', data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to update course.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Validation Error: Course ID is required.' }, { status: 400 });
    }

    const deleted = await dbService.deleteCourse(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Course not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Course deleted successfully.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to delete course.' }, { status: 500 });
  }
}
