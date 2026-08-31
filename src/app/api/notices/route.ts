import { NextResponse } from 'next/server';
import { db } from '@/lib/db/storage';

export async function GET() {
  try {
    const notices = db.getNotices();
    return NextResponse.json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    const newNotice = db.addNotice({
      title: body.title,
      content: body.content,
      category: body.category || 'General',
      targetAudience: body.targetAudience || 'All',
      author: body.author || 'Academic Administration',
      isPinned: !!body.isPinned,
    });

    return NextResponse.json({ success: true, data: newNotice }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to publish notice' }, { status: 500 });
  }
}
