import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/bcrypt';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, location, phone } = body;

    // Validate required fields
    if (!name || !email || !password || !location || !phone) {
      return NextResponse.json({ 
        error: 'Name, email, password, location, and phone are required' 
      }, { status: 400 });
    }

    // Define validation schema
    const signupSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.email('Please provide a valid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        location: z.string().min(1, 'Location is required'),
        phone: z.string().min(1, 'Phone is required')
    });

    // Validate request body
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
        return NextResponse.json({ 
            error: validationResult.error.issues[0].message 
        }, { status: 400 });
    }

    // Check if commissioner already exists
    const existingCommissioner = await prisma.commissioner.findUnique({
      where: { email }
    });

    if (existingCommissioner) {
      return NextResponse.json({ 
        error: 'Commissioner with this email already exists' 
      }, { status: 409 });
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

    const res = NextResponse.json({
      success: true,
      message: 'Commissioner registered successfully',
      user: {
        id: newCommissioner.id,
        name: newCommissioner.name,
        email: newCommissioner.email,
        createdAt: newCommissioner.created_at
      }
    }, { status: 201 });

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
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle Prisma unique constraint violations
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2002') {
      return NextResponse.json({ 
        error: 'Commissioner with this email already exists' 
      }, { status: 409 });
    }

    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
