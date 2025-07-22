import { z } from "zod";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { sendResetEmail } from "@/lib/mail";
import { withErrorHandling, ValidationError } from "@/lib/error-handler";
import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { forgotPasswordSchema } from "@/schemas/auth"; // Import from schemas

async function forgetPassword(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const result = forgotPasswordSchema.safeParse(body);

  if (!result.success) {
    throw new ValidationError("Invalid email format", result.error.flatten().fieldErrors);
  }

  const { email } = result.data;

  const commissioner = await prisma.commissioner.findUnique({
    where: { email }
  });

  if (!commissioner) {
    return createSuccessResponse({
      message: "If this email exists, a reset link has been sent"
    });
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  // Invalidate any existing unused reset tokens for this user
  await prisma.passwordReset.updateMany({
    where: {
      commissioner_id: commissioner.id,
      used: false,
      expires_at: { gt: new Date() }
    },
    data: { used: true }
  });

  // Create new password reset record
  await prisma.passwordReset.create({
    data: {
      commissioner_id: commissioner.id,
      token,
      expires_at: expiresAt
    }
  });

  // Send reset email
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/commissioner/reset-password?token=${token}&email=${email}`;
  await sendResetEmail(email, resetLink);

  return createSuccessResponse({
    message: "If this email exists, a reset link has been sent"
  });
}

export const POST = withErrorHandling(forgetPassword, "ForgotPassword");