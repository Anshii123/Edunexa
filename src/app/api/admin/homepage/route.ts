import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { db } from '@/lib/db/storage';

export async function GET() {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  const metrics = db.getMetrics();
  return NextResponse.json({ success: true, data: metrics });
}

export async function PUT(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    db.updateMetrics(body);
    const updated = db.getMetrics();
    return NextResponse.json({ success: true, message: 'Homepage metrics updated successfully.', data: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update homepage content.' }, { status: 500 });
  }
}
