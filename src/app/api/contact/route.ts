import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db/service';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+\-()]{7,20}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim() || '';
    const subject = body.subject?.trim() || 'General Inquiry';
    const message = body.message?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (phone && !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number.' },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please provide a message with at least 5 characters.' },
        { status: 400 }
      );
    }

    const lead = await dbService.createAdmission({
      name,
      email,
      phone: phone || '+1 (800) 555-NEXA',
      targetCourseId: 'general-contact',
      targetCourseTitle: subject,
      currentEducation: 'Contact Form Inquiry',
      city: 'Web Visitor',
      preferredMode: 'Online',
      message,
      status: 'New',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent to our academic desk.',
        data: {
          id: lead.id,
          referenceId: lead.referenceId,
          name: lead.name,
          createdAt: lead.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit contact message.' },
      { status: 500 }
    );
  }
}
