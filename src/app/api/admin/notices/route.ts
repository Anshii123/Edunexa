import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { dbService } from '@/lib/db/service';

export async function GET() {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const notices = await dbService.getNotices();
    return NextResponse.json({ success: true, data: notices });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch notices.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: Title and content are required.' },
        { status: 400 }
      );
    }

    const newNotice = await dbService.createNotice({
      title: body.title.trim(),
      content: body.content.trim(),
      category: body.category || 'General',
      targetAudience: body.targetAudience || 'All',
      isPinned: Boolean(body.isPinned),
      author: body.author || 'Academic Board',
    });

    return NextResponse.json(
      { success: true, message: 'Notice published successfully.', data: newNotice },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to publish notice.' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Validation Error: Notice ID is required.' }, { status: 400 });
    }

    const updated = await dbService.updateNotice(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Notice not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Notice updated successfully.', data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to update notice.' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Validation Error: Notice ID is required.' }, { status: 400 });
    }

    const deleted = await dbService.deleteNotice(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Notice not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Notice deleted successfully.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to delete notice.' }, { status: 500 });
  }
}
