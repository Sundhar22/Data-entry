import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, verifyRefreshToken, signAccessToken } from './jwt';
import { AuthenticatedRequest, JWTPayload } from '@/types/auth';
import prisma from './prisma';

export async function verifyAuth(req: NextRequest): Promise<{
  success: boolean;
  user?: JWTPayload;
  response?: NextResponse;
}> {
  try {
    const accessToken = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('refresh_token')?.value;

    if (!accessToken && !refreshToken) {
      return {
        success: false,
        response: NextResponse.json({ error: 'No authentication tokens found' }, { status: 401 })
      };
    }

    // Try to verify access token first
    if (accessToken) {
      try {
        const decoded = verifyAccessToken(accessToken) as JWTPayload;
        
        // Verify user still exists in database
        const user = await prisma.commissioner.findUnique({
          where: { id: decoded.id },
          select: { id: true, name: true, email: true }
        });

        if (!user) {
          return {
            success: false,
            response: NextResponse.json({ error: 'User not found' }, { status: 401 })
          };
        }

        return {
          success: true,
          user: decoded
        };
      } catch (accessTokenError) {
        // Access token is invalid, try refresh token
        console.log('Access token invalid, trying refresh token');
      }
    }

    // Try to use refresh token to get new access token
    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken) as JWTPayload;
        
        // Verify user still exists in database
        const user = await prisma.commissioner.findUnique({
          where: { id: decoded.id },
          select: { id: true, name: true, email: true }
        });

        if (!user) {
          return {
            success: false,
            response: NextResponse.json({ error: 'User not found' }, { status: 401 })
          };
        }

        // Generate new access token
        const newAccessToken = signAccessToken({
          id: user.id,
          email: user.email,
          name: user.name
        });

        // Create response with new access token
        const response = NextResponse.json({ 
          message: 'Token refreshed successfully',
          user: { id: user.id, email: user.email, name: user.name }
        });

        response.cookies.set('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60 // 15 minutes
        });

        return {
          success: true,
          user: decoded,
          response
        };
      } catch (refreshTokenError) {
        // Both tokens are invalid
        return {
          success: false,
          response: NextResponse.json({ error: 'Invalid or expired tokens' }, { status: 401 })
        };
      }
    }

    return {
      success: false,
      response: NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      response: NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
    };
  }
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const authResult = await verifyAuth(req);
    
    if (!authResult.success) {
      return authResult.response!;
    }

    // If we got a response (token was refreshed), return it
    if (authResult.response) {
      return authResult.response;
    }

    // Attach user to request
    (req as AuthenticatedRequest).user = authResult.user!;

    return handler(req as AuthenticatedRequest);
  };
}

export async function requireAuth(req: NextRequest): Promise<{ success: boolean; user?: JWTPayload; error?: NextResponse }> {
  const authResult = await verifyAuth(req);
  
  if (!authResult.success) {
    return { success: false, error: authResult.response! };
  }

  // If token was refreshed, handle it appropriately
  if (authResult.response) {
    // For token refresh, we still want to continue with the original request
    // but we should return the refresh response
    return { success: false, error: authResult.response };
  }

  return { success: true, user: authResult.user! };
}

// Helper function to get user from request headers (when using middleware)
export function getUserFromHeaders(req: NextRequest): JWTPayload | null {
  const userId = req.headers.get('x-user-id');
  const userEmail = req.headers.get('x-user-email');
  const userName = req.headers.get('x-user-name');

  if (!userId || !userEmail || !userName) {
    return null;
  }

  return {
    id: userId,
    email: userEmail,
    name: userName
  };
}
