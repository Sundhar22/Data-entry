import { NextRequest, NextResponse } from 'next/server';
import { getUserFromHeaders, verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Define protected routes patterns
  const protectedRoutes = [
    '/api/commissioner/me',
    '/api/farmers',
    '/api/products',
    '/api/bills',
    '/api/auction',
    // Add more protected routes as needed
  ];

  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Skip authentication for auth routes
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // If it's a protected route, verify authentication
  if (isProtectedRoute) {
    const authResult = await verifyAuth(request);
    
    if (!authResult.success) {
      // If authentication fails, return the error response
      return authResult.response!;
    }

    // If token was refreshed, return the response with new token
    if (authResult.response) {
      return authResult.response;
    }

    // Attach user to request headers for API routes
    return getUserFromHeaders(request);
  }

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
