import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { dbService } from '@/lib/db/service';

export async function GET() {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const faculty = await dbService.getFaculty();
    return NextResponse.json({ success: true, data: faculty });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch faculty.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.title || !body.department) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: Name, title, and department are required.' },
        { status: 400 }
      );
    }

    const newFaculty = await dbService.createFaculty({
      name: body.name.trim(),
      title: body.title.trim(),
      department: body.department.trim(),
      qualifications: body.qualifications?.trim() || 'Distinguished Scholar',
      experienceYears: Number(body.experienceYears) || 5,
      specialization: body.specialization || ['Subject Mastery'],
      bio: body.bio?.trim() || '',
      avatar:
        body.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      rating: body.rating || 4.9,
      studentsMentored: body.studentsMentored || 500,
      email: body.email?.trim() || 'faculty@edunexa.edu',
    });

    return NextResponse.json(
      { success: true, message: 'Faculty member added successfully.', data: newFaculty },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to add faculty member.' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Validation Error: Faculty ID is required.' }, { status: 400 });
    }

    const updated = await dbService.updateFaculty(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Faculty member not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Faculty details updated successfully.', data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to update faculty member.' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Validation Error: Faculty ID is required.' }, { status: 400 });
    }

    const deleted = await dbService.deleteFaculty(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Faculty member not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Faculty member removed successfully.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to remove faculty member.' }, { status: 500 });
  }
}
