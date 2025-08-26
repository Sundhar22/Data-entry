import { NextRequest } from 'next/server';
import { comparePassword } from '@/lib/bcrypt';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import { createSuccessResponse, CommonErrors } from '@/lib/api-response';
import { withErrorHandling } from '@/lib/error-handler';
import prisma from '@/lib/prisma';

async function loginHandler(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return CommonErrors.BadRequest('Email and password are required');
  }

  // Find commissioner by email
  const commissioner = await prisma.commissioner.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, password: true }
  });

  if (!commissioner || !(await comparePassword(password, commissioner.password))) {
    return CommonErrors.InvalidCredentials();
  }

  const payload = {
    id: commissioner.id,
    email: commissioner.email,
    name: commissioner.name
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const res = createSuccessResponse({
    user: { id: commissioner.id, email: commissioner.email, name: commissioner.name }
  });

  res.cookies.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 60 // 15 minutes
  });

  res.cookies.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });

  return res;
}

export const POST = withErrorHandling(loginHandler, 'Login');
