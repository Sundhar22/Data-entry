import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/error-handler';

// Global error boundary for API routes
export async function middleware(request: Request) {
    try {
        // This will be handled by the specific route handlers
        return NextResponse.next();
    } catch (error) {
        // This is a fallback for any unhandled errors
        return handleApiError(error, 'Global Middleware');
    }
}

export const config = {
    matcher: '/api/:path*',
};
