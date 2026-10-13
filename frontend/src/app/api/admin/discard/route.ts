import { NextRequest, NextResponse } from 'next/server';
import { discardDraft, requireSession, verifyCsrf, verifyOriginAndHost } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    verifyOriginAndHost(req.headers);
    const session = requireSession(req.headers.get('cookie'));
    verifyCsrf(req.headers.get('x-csrf-token'), session);
    const body = await req.json().catch(() => ({}));
    const { revision, catalog } = await discardDraft(body.revision);
    return NextResponse.json(
      { revision, catalog },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { error: err.status ? err.message : 'Unable to discard the draft.' },
      { status: err.status || 500 }
    );
  }
}
