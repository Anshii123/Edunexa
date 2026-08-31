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
    const search = searchParams.get('q') || searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 50;

    const result = await dbService.getEnquiries({ search, status, page, limit });
    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch enquiries.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const enquiry = await dbService.createEnquiry({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || '',
      subject: body.subject?.trim() || 'Campus Inquiry',
      message: body.message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received. Our advisory team will contact you shortly.',
        data: enquiry,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to submit inquiry.' }, { status: 500 });
  }
}
