import { NextRequest, NextResponse } from 'next/server';
import { requireSession, uploadMedia, verifyCsrf, verifyOriginAndHost } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    verifyOriginAndHost(req.headers);
    const session = requireSession(req.headers.get('cookie'));
    verifyCsrf(req.headers.get('x-csrf-token'), session);
    const body = await req.json().catch(() => ({}));
    const result = await uploadMedia(body.data);
    return NextResponse.json(result, {
      status: 201,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { error: err.message || 'Media upload failed' },
      { status: err.status || 500 }
    );
  }
}
