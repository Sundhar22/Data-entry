import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, signAccessToken } from '@/lib/jwt';
import { JWTPayload } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
    }

    const decoded = verifyRefreshToken(refreshToken) as JWTPayload;
    
    const payload = { 
      id: decoded.id, 
      email: decoded.email, 
      name: decoded.name 
    };

    const newAccessToken = signAccessToken(payload);

    const res = NextResponse.json({ success: true });
    res.cookies.set('access_token', newAccessToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 // 15 minutes
    });
    
    return res;
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
  }
}
