import { NextResponse } from 'next/server';
import { initCatalogState, publicCatalogue } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const state = await initCatalogState();
    return NextResponse.json(publicCatalogue(state.published), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { error: err.message || 'Catalogue service unavailable' },
      { status: err.status || 500 }
    );
  }
}
