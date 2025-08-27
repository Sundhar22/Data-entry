import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected API routes
  const protectedApiRoutes = [
    "/api/commissioner/me",
    "/api/farmers",
    "/api/products",
    "/api/bills",
    "/api/auction",
    "/api/sessions",
  ];

  // Define protected frontend routes
  const protectedFrontendRoutes = [
    "/",
    "/farmers",
    "/products",
    "/buyers",
    "/auctions",
    "/bills",
    "/analytics",
  ];

  // Auth routes that should be accessible without authentication
  const authRoutes = ["/auth/login", "/auth/signup"];

  // Check if the current path is a protected API route
  const isProtectedApiRoute = protectedApiRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Check if the current path is a protected frontend route
  const isProtectedFrontendRoute = protectedFrontendRoutes.some(
    (route) => pathname === route,
  );

  // Skip authentication for auth API routes
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // Skip authentication for auth frontend routes
  if (authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If it's a protected route (API or frontend), verify authentication
  if (isProtectedApiRoute || isProtectedFrontendRoute) {
    const authResult = await verifyAuth(request);

    if (!authResult.success) {
      // For frontend routes, redirect to login
      if (isProtectedFrontendRoute) {
        const loginUrl = new URL("/auth/login", request.url);
        return NextResponse.redirect(loginUrl);
      }

      // For API routes, return the error response
      return authResult.response!;
    }

    // Prepare a passthrough response and attach refreshed access token if present
    const passthrough = NextResponse.next();
    if (authResult.response) {
      const refreshedCookie = authResult.response.cookies.get("access_token");
      if (refreshedCookie) {
        passthrough.cookies.set("access_token", refreshedCookie.value, {
          httpOnly: true,
          secure: NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 15 * 60,
        });
      }
    }

    // Attach user to request headers for API routes
    if (isProtectedApiRoute) {
      passthrough.headers.set("x-user-id", authResult.user!.id);
      passthrough.headers.set("x-user-email", authResult.user!.email);
      passthrough.headers.set("x-user-name", authResult.user!.name);
    }

    return passthrough;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
