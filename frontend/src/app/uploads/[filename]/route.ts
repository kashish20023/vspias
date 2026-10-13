import { NextRequest, NextResponse } from 'next/server';
import { getUploadFile } from '@/lib/catalog-service';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    const relName = 'uploads/' + filename;
    const cookie = req.headers.get('cookie');
    const { buffer, contentType, isLive } = await getUploadFile(relName, cookie);

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Length': String(buffer.length),
      'Cache-Control': isLive ? 'public, max-age=3600' : 'no-store'
    };

    if (filename.toLowerCase().endsWith('.pdf')) {
      headers['Content-Disposition'] = 'attachment; filename="VSPIAS-Company-Brochure.pdf"';
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers
    });
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string };
    return NextResponse.json(
      { error: err.message || 'File not found' },
      { status: err.status || 404 }
    );
  }
}
