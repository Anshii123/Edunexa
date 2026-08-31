import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'edunexa_session_token';

// Simple base64url payload decoder for Edge middleware
function decodeSessionPayload(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const base64 = parts[0].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    const payload = JSON.parse(json);
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get(SESSION_COOKIE_NAME);
  const session = tokenCookie?.value ? decodeSessionPayload(tokenCookie.value) : null;

  const isAdminRoute = pathname.startsWith('/admin');
  const isStudentRoute = pathname.startsWith('/student');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // 1. Protect Admin Pages
  if (isAdminRoute) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (session.role !== 'admin') {
      const studentUrl = new URL('/student/dashboard', request.url);
      studentUrl.searchParams.set('error', 'unauthorized_admin');
      return NextResponse.redirect(studentUrl);
    }
  }

  // 2. Protect Student Pages
  if (isStudentRoute) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Protect Admin API routes
  if (isAdminApi) {
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin privileges required.' },
        { status: 403 }
      );
    }
  }

  // 4. Redirect already-logged-in users from login/register
  if (isAuthRoute && session) {
    const redirectPath = session.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/student/:path*',
    '/api/admin/:path*',
    '/login',
    '/register',
  ],
};
