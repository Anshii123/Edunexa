import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { dbService } from '@/lib/db/service';

export async function GET() {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const events = await dbService.getEvents();
    return NextResponse.json({ success: true, data: events });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch events.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { user } = await getServerSession();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const eventType = body.type || body.category || 'Workshop';
    if (!body.title || !body.date) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: Title and date are required.' },
        { status: 400 }
      );
    }

    const newEvent = await dbService.createEvent({
      title: body.title.trim(),
      subtitle: body.subtitle?.trim() || '',
      type: eventType,
      date: body.date,
      time: body.time || '10:00 AM – 1:00 PM EST',
      location: body.location || 'Main Innovation Amphitheater',
      mode: body.mode || 'In-Person',
      speakers: body.speakers || ['EduNexa Faculty Dean'],
      registrationUrl: body.registrationUrl || '/admissions',
      seatsLeft: Number(body.seatsLeft) || 50,
      thumbnail:
        body.thumbnail ||
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    });

    return NextResponse.json(
      { success: true, message: 'Event scheduled successfully.', data: newEvent },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to create event.' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Validation Error: Event ID is required.' }, { status: 400 });
    }

    const updated = await dbService.updateEvent(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Event not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Event updated successfully.', data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to update event.' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Validation Error: Event ID is required.' }, { status: 400 });
    }

    const deleted = await dbService.deleteEvent(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Event not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Event deleted successfully.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to delete event.' }, { status: 500 });
  }
}
