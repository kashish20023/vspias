import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/catalog-service';
import { getEnquiries, deleteEnquiry } from '@/lib/enquiry-store';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    requireSession(req.headers.get('cookie'));
    const enquiries = await getEnquiries();
    enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(
      { ok: true, enquiries },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      }
    );
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { ok: false, error: err.message || 'Unauthorized' },
      { status: err.status || 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    requireSession(req.headers.get('cookie'));
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      const body = await req.json().catch(() => null);
      if (body && typeof body.id === 'string') {
        id = body.id;
      }
    }

    if (!id) {
      return NextResponse.json({ ok: false, error: 'Enquiry ID is required.' }, { status: 400 });
    }

    const deleted = await deleteEnquiry(id);
    return NextResponse.json(
      { ok: true, deleted },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      }
    );
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { ok: false, error: err.message || 'Unauthorized' },
      { status: err.status || 500 }
    );
  }
}
