import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit, createRateLimitResponse } from '@/lib/rate-limit';
import { verifySession } from '@/lib/auth';

function getAllowedOrigins(): string[] {
  return (process.env.NEXT_PUBLIC_SITE_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getCorsOrigin(request: NextRequest): string {
  const requestOrigin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return allowedOrigins[0] || 'https://maruonline.com';
}

export async function middleware(request: NextRequest) {
  // Security headers
  const response = NextResponse.next();
  
  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', getCorsOrigin(request));
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Vary', 'Origin');
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // frame-src MUST include Google: reCAPTCHA v3 runs its verification in a
  // hidden iframe on www.google.com. Without it the browser refuses the frame,
  // grecaptcha still hands back a token, and siteverify rejects that token with
  // error-codes ['browser-error'] — which surfaces to the visitor as a generic
  // "Something went wrong". Every assessment submission failed this way, on
  // every browser and device, until 4 Aug 2026.
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https://www.google.com https://recaptcha.google.com; frame-ancestors 'none';");

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: response.headers });
  }

  // Admin route protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      return response;
    }

    const token = request.cookies.get('admin-session')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const session = await verifySession(token);
    
    if (!session || session.role !== 'admin') {
      const loginResponse = NextResponse.redirect(new URL('/admin/login', request.url));
      loginResponse.cookies.delete('admin-session');
      return loginResponse;
    }

    return response;
  }

  // API rate limiting
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateLimitResult = rateLimit(request);
    const { headers } = createRateLimitResponse(rateLimitResult);
    
    // Add rate limit headers to response
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: response.headers }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};