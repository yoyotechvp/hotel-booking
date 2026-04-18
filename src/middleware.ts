import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const protectedRoutes = ['/dashboard', '/bookings', '/profile'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/bookings/:path*', '/profile/:path*'],
};