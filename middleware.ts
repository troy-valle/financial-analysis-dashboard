import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Allow access to /login
  if (req.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  // Check for an auth token (e.g., cookie named 'token')
  const token = req.cookies.get('token');
  if (!token) {
    // Redirect unauthenticated users to /login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};