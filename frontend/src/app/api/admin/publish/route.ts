import { NextRequest, NextResponse } from 'next/server';
import { publishDraft, requireSession, verifyCsrf, verifyOriginAndHost } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    verifyOriginAndHost(req.headers);
    const session = requireSession(req.headers.get('cookie'));
    verifyCsrf(req.headers.get('x-csrf-token'), session);
    const body = await req.json().catch(() => ({}));
    const { revision, publishedAt } = await publishDraft(body.revision);
    return NextResponse.json(
      { revision, publishedAt },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { error: err.status ? err.message : 'Unable to publish the draft.' },
      { status: err.status || 500 }
    );
  }
}
