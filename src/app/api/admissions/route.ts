import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db/service';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+\-()]{7,20}$/;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 50;

    const result = await dbService.getAdmissions({ status, search, page, limit });
    return NextResponse.json({
      success: true,
      count: result.data.length,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch admissions records.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Server-side Validation
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const targetCourseTitle = body.targetCourseTitle?.trim() || 'General Admissions';
    const targetCourseId = body.targetCourseId?.trim() || 'course-1';
    const currentEducation = body.currentEducation?.trim() || 'Not Specified';
    const city = body.city?.trim() || 'Not Specified';
    const preferredMode = body.preferredMode || 'Hybrid';
    const message = body.message?.trim() || '';

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!phone || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid phone number (minimum 7 digits).' },
        { status: 400 }
      );
    }

    // 2. Save into MongoDB Atlas via dbService
    const newLead = await dbService.createAdmission({
      name,
      email,
      phone,
      targetCourseId,
      targetCourseTitle,
      currentEducation,
      city,
      preferredMode,
      message,
      status: 'New',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your application has been registered successfully.',
        data: newLead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'An internal server error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
