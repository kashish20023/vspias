import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory sliding window rate limiter
const rateLimits = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  rateLimits.forEach((record, key) => {
    if (record.resetTime <= now) {
      rateLimits.delete(key);
    }
  });
}, 60000);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only apply rate limiting to API routes
  if (!path.startsWith('/api')) {
    return NextResponse.next();
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1';

  // Specific tiers based on sensitivity
  let limit = 120; // Default general API limit: 120 requests / minute
  let windowMs = 60 * 1000;

  if (path.startsWith('/api/login')) {
    limit = 10; // Login endpoint: 10 attempts / minute (brute-force defense)
    windowMs = 60 * 1000;
  } else if (path.startsWith('/api/enquiries')) {
    limit = 30; // Enquiry submissions: 30 requests / minute (anti-spam)
    windowMs = 60 * 1000;
  } else if (path.startsWith('/api/admin')) {
    limit = 60; // Admin actions: 60 requests / minute
    windowMs = 60 * 1000;
  }

  const key = `${ip}:${path.startsWith('/api/login') ? 'login' : path.startsWith('/api/enquiries') ? 'enquiries' : path.startsWith('/api/admin') ? 'admin' : 'general'}`;
  const now = Date.now();

  const record = rateLimits.get(key);

  if (!record || record.resetTime <= now) {
    rateLimits.set(key, { count: 1, resetTime: now + windowMs });
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', (limit - 1).toString());
    return response;
  }

  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests. Please slow down and try again later.',
        retryAfterSeconds: retryAfter
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'Cache-Control': 'no-store'
        }
      }
    );
  }

  record.count++;
  rateLimits.set(key, record);

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', Math.max(0, limit - record.count).toString());
  return response;
}

export const config = {
  matcher: ['/api/:path*']
};
