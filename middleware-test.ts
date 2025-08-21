import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Simple redirect test - redirect everyone from home to login
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
