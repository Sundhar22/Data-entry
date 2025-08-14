import prisma from "@/lib/prisma";
import { withErrorHandling, ValidationError, NotFoundError } from "@/lib/error-handler";
import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { resetPasswordSchema } from "@/schemas/auth";
import { hashPassword } from "@/lib/bcrypt";

async function resetPassword(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const result = resetPasswordSchema.safeParse(body);

  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.flatten().fieldErrors);
  }

  const { token, email, password } = result.data;

  // Find the commissioner
  const commissioner = await prisma.commissioner.findUnique({
    where: { email }
  });

  if (!commissioner) {
    throw new NotFoundError("Invalid reset request");
  }

  // Find valid reset token
  const passwordReset = await prisma.passwordReset.findFirst({
    where: {
      token,
      commissioner_id: commissioner.id,
      used: false,
      expires_at: { gt: new Date() }
    }
  });

  if (!passwordReset) {
    throw new NotFoundError("Invalid or expired reset token");
  }

  // Hash new password
  const hashedPassword = await hashPassword(password);

  // Update password and mark token as used
  await prisma.$transaction([
    // Update commissioner password
    prisma.commissioner.update({
      where: { id: commissioner.id },
      data: { password: hashedPassword }
    }),
    
    // Mark token as used
    prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { 
        used: true,
        used_at: new Date()
      }
    })
  ]);

  return createSuccessResponse({
    message: "Password reset successfully"
  });
}

export const POST = withErrorHandling(resetPassword, "ResetPassword");