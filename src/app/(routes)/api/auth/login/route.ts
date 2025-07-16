import { NextRequest, NextResponse } from 'next/server';
import { comparePassword } from '@/lib/bcrypt';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find commissioner by email
    const commissioner = await prisma.commissioner.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, password: true }
    });

    if (!commissioner || !(await comparePassword(password, commissioner.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const payload = {
      id: commissioner.id,
      email: commissioner.email,
      name: commissioner.name
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const res = NextResponse.json({
      success: true,
      user: { id: commissioner.id, email: commissioner.email, name: commissioner.name }
    });

    res.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 // 15 minutes
    });

    res.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
