import { NextRequest } from 'next/server';
import { hashPassword } from '@/lib/bcrypt';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import { createSuccessResponse, CommonErrors } from '@/lib/api-response';
import { withErrorHandling, ConflictError } from '@/lib/error-handler';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { signupSchema } from '@/schemas/auth';

async function signupHandler(req: NextRequest) {
  const body = await req.json();

  // Validate request body
  const validationResult = signupSchema.safeParse(body);
  if (!validationResult.success) {
    return CommonErrors.ValidationError(
      'Validation failed',
      validationResult.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    );
  }

  const { name, email, password, location, phone } = validationResult.data;

  // Check if commissioner already exists
  const existingCommissioner = await prisma.commissioner.findUnique({
    where: { email }
  });

  if (existingCommissioner) {
    throw new ConflictError('Commissioner with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create new commissioner
  const newCommissioner = await prisma.commissioner.create({
    data: {
      name,
      email,
      password: hashedPassword,
      location,
      phone
    },
    select: {
      id: true,
      name: true,
      email: true,
      created_at: true
    }
  });

  const payload = {
    id: newCommissioner.id,
    email: newCommissioner.email,
    name: newCommissioner.name
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const res = createSuccessResponse({
    message: 'Commissioner registered successfully',
    user: {
      id: newCommissioner.id,
      name: newCommissioner.name,
      email: newCommissioner.email,
      createdAt: newCommissioner.created_at
    }
  }, 201);

  // Set cookies for automatic login after signup
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
}

export const POST = withErrorHandling(signupHandler, 'Signup');
