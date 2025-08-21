import { NextRequest, NextResponse } from 'next/server';
import { getUserFromHeaders, verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('🚀 MIDDLEWARE CALLED FOR:', pathname);

  // Define protected API routes
  const protectedApiRoutes = [
    '/api/commissioner/me',
    '/api/farmers',
    '/api/products',
    '/api/bills',
    '/api/auction',
    '/api/sessions',
  ];

  // Define protected frontend routes
  const protectedFrontendRoutes = [
    '/',
    '/farmers',
    '/products',
    '/buyers',
    '/auctions',
    '/bills',
    '/analytics',
  ];

  // Auth routes that should be accessible without authentication
  const authRoutes = ['/auth/login', '/auth/signup'];

  // Check if the current path is a protected API route
  const isProtectedApiRoute = protectedApiRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if the current path is a protected frontend route
  const isProtectedFrontendRoute = protectedFrontendRoutes.some(route => 
    pathname === route
  );

  // Skip authentication for auth API routes
  if (pathname.startsWith('/api/auth/')) {
    console.log('⚪ Skipping auth for API auth route:', pathname);
    return NextResponse.next();
  }

  // Skip authentication for auth frontend routes
  if (authRoutes.includes(pathname)) {
    console.log('⚪ Skipping auth for frontend auth route:', pathname);
    return NextResponse.next();
  }

  // If it's a protected route (API or frontend), verify authentication
  if (isProtectedApiRoute || isProtectedFrontendRoute) {
    console.log('🔒 Protected route detected:', pathname, 'API:', isProtectedApiRoute, 'Frontend:', isProtectedFrontendRoute);
    
    const authResult = await verifyAuth(request);
    console.log('🔑 Auth result:', authResult.success);
    
    if (!authResult.success) {
      // For frontend routes, redirect to login
      if (isProtectedFrontendRoute) {
        console.log('� Redirecting to login from:', pathname);
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      
      // For API routes, return the error response
      console.log('❌ API auth failed for:', pathname);
      return authResult.response!;
    }

    // If token was refreshed, return the response with new token
    if (authResult.response) {
      console.log('🔄 Token refreshed for:', pathname);
      return authResult.response;
    }

    // Attach user to request headers for API routes
    if (isProtectedApiRoute) {
      console.log('✅ API route authenticated:', pathname);
      return getUserFromHeaders(request);
    }
    
    console.log('✅ Frontend route authenticated:', pathname);
  }

  console.log('⚪ Unprotected route, continuing:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
