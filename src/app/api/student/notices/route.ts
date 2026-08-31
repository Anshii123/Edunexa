import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { db } from '@/lib/db/storage';

export async function GET(request: Request) {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please sign in.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || '';
  const search = searchParams.get('q') || '';

  let notices = db.getNotices().filter(n => n.targetAudience === 'All' || n.targetAudience === 'Students');

  if (category && category !== 'All') {
    notices = notices.filter(n => n.category.toLowerCase() === category.toLowerCase());
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    notices = notices.filter(
      n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    data: notices,
  });
}
