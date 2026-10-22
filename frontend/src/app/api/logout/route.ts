import { NextRequest, NextResponse } from 'next/server';
import { getSession, handleLogout, verifyOriginAndHost } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    verifyOriginAndHost(req.headers);
    const session = getSession(req.headers.get('cookie'));
    if (session) {
      handleLogout(session);
    }

    const res = NextResponse.json(
      { ok: true },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
    res.cookies.set('vspias_admin', '', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0
    });
    return res;
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { error: err.message || 'Logout failed' },
      { status: err.status || 500 }
    );
  }
}
