import { NextRequest, NextResponse } from 'next/server';
import { getSession, isPasswordConfigured } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie');
  const session = getSession(cookie);
  return NextResponse.json(
    {
      authenticated: Boolean(session),
      adminConfigured: isPasswordConfigured(),
      csrf: session?.csrf || null
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  );
}
