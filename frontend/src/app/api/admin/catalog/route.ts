import { NextRequest, NextResponse } from 'next/server';
import { initCatalogState, requireSession } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = requireSession(req.headers.get('cookie'));
    const state = await initCatalogState();
    return NextResponse.json(
      {
        ...JSON.parse(JSON.stringify(state)),
        csrf: session.csrf
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      }
    );
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { error: err.message || 'Unauthorized' },
      { status: err.status || 500 }
    );
  }
}
