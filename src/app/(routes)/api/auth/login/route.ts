import { NextRequest, NextResponse } from 'next/server';
import { comparePassword } from '@/lib/bcrypt';
import { findCommissionerByEmail } from '@/lib/services';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const commissioner = findCommissionerByEmail(email);
  if (!commissioner || !(await comparePassword(password, commissioner.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const accessToken = signAccessToken({ id: commissioner.id, email: commissioner.email });
  const refreshToken = signRefreshToken({ id: commissioner.id, email: commissioner.email });

  const res = NextResponse.json({ success: true });
  res.cookies.set('access_token', accessToken, { httpOnly: true, secure: true });
  res.cookies.set('refresh_token', refreshToken, { httpOnly: true, secure: true, path: '/api/auth/refresh' });

  return res;
}
