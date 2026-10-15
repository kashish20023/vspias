import { NextRequest, NextResponse } from 'next/server';
import { addEnquiry } from '@/lib/enquiry-store';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, error: 'Invalid submission data.' }, { status: 400 });
    }

    // Honeypot spam check
    if (body.hp || body.honeypot || body.website_url) {
      return NextResponse.json({ ok: false, error: 'Invalid submission.' }, { status: 400 });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const division = typeof body.division === 'string' ? body.division.trim() : '';
    const quantity = typeof body.quantity === 'string' ? body.quantity.trim() : '';
    const bagFinish = typeof body.bagFinish === 'string' ? body.bagFinish.trim() : '';
    const brandName = typeof body.brandName === 'string' ? body.brandName.trim() : '';
    const industrySector = typeof body.industrySector === 'string' ? body.industrySector.trim() : '';

    if (!name) {
      return NextResponse.json({ ok: false, error: 'Please enter your full name.' }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ ok: false, error: 'Name must not exceed 100 characters.' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Please enter your email address.' }, { status: 400 });
    }
    if (email.length > 150 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (phone && phone.length > 20) {
      return NextResponse.json({ ok: false, error: 'Phone number must not exceed 20 characters.' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ ok: false, error: 'Please enter your enquiry requirements.' }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ ok: false, error: 'Message must not exceed 2000 characters.' }, { status: 400 });
    }

    await addEnquiry({
      name,
      email,
      phone,
      message,
      company: company.slice(0, 150),
      division: division.slice(0, 100),
      quantity: quantity.slice(0, 100),
      bagFinish: bagFinish.slice(0, 150),
      brandName: brandName.slice(0, 150),
      industrySector: industrySector.slice(0, 150)
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json({ ok: false, error: e.message || 'Server error saving enquiry.' }, { status: 500 });
  }
}
