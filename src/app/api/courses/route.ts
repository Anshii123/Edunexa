import { NextResponse } from 'next/server';
import { db } from '@/lib/db/storage';

export async function GET() {
  try {
    const courses = db.getCourses();
    return NextResponse.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch courses' }, { status: 500 });
  }
}
