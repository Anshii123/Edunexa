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
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('q') || searchParams.get('search') || undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 50;

    const result = await dbService.getAdmissions({
      status,
      search,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      count: result.data.length,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch admissions.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.id || !body.status) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: Lead ID and status are required.' },
        { status: 400 }
      );
    }

    const updated = await dbService.updateAdmissionStatus(body.id, body.status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Lead status updated to ${body.status}.`, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to update lead status.' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Validation Error: Lead ID is required.' }, { status: 400 });
    }

    const deleted = await dbService.deleteAdmission(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Admission lead deleted successfully.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to delete lead.' }, { status: 500 });
  }
}
