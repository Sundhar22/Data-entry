import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, signAccessToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh_token')?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as any;
    const newAccessToken = signAccessToken({ id: decoded.id, email: decoded.email });

    const res = NextResponse.json({ success: true });
    res.cookies.set('access_token', newAccessToken, { httpOnly: true, secure: true });
    return res;
  } catch (e) {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
  }
}
