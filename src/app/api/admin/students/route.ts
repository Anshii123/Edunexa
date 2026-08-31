import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { db } from '@/lib/db/storage';

export async function GET(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q');

  let students = db.getStudents();

  if (search && search.trim()) {
    const q = search.toLowerCase();
    students = students.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.batch.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, count: students.length, data: students });
}

export async function PUT(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Student ID is required.' }, { status: 400 });
    }

    const updated = db.updateStudent(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Student record not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Student record updated successfully.', data: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update student record.' }, { status: 500 });
  }
}
