import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { mediaService } from '@/lib/media/service';
import { MEDIA_REGISTRY } from '@/lib/media/registry';

export async function GET(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let items = mediaService.getAllMedia();
  if (category && category !== 'All') {
    items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }

  return NextResponse.json({ success: true, count: items.length, data: items });
}

export async function POST(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.url || !body.title || !body.category) {
      return NextResponse.json({ success: false, error: 'URL, title, and category are required.' }, { status: 400 });
    }

    const newMedia = mediaService.registerCustomMedia({
      title: body.title.trim(),
      alt: body.alt?.trim() || body.title.trim(),
      category: body.category,
      url: body.url.trim(),
      width: Number(body.width) || 1200,
      height: Number(body.height) || 800,
      format: body.format || 'jpg',
      aspectRatio: body.aspectRatio || '16/9',
      caption: body.caption?.trim(),
      tags: body.tags || ['admin-upload'],
    });

    return NextResponse.json({ success: true, message: 'Media asset uploaded/registered.', data: newMedia }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to register media asset.' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Media ID is required.' }, { status: 400 });
    }

    const deleted = mediaService.deleteMedia(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Media asset not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Media asset deleted successfully.' });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to delete media asset.' }, { status: 500 });
  }
}
