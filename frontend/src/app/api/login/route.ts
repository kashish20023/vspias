import { NextRequest, NextResponse } from 'next/server';
import { handleLogin, verifyOriginAndHost } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    verifyOriginAndHost(req.headers);
    const body = await req.json().catch(() => ({}));
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { token, id } = await handleLogin(body.password, ip);

    const res = NextResponse.json(
      { authenticated: true, csrf: token },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
    res.cookies.set('vspias_admin', id, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 28800
    });
    return res;
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { error: err.message || 'Login failed' },
      { status: err.status || 500 }
    );
  }
}
