// app/api/commissioner/reset-password/route.ts
import { z } from "zod";
import  prisma from "@/lib/prisma";
import { withErrorHandling, ValidationError, NotFoundError } from "@/lib/error-handler";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const schema = z.object({
  email: z.email(),
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const POST = withErrorHandling(async (req: Request): Promise<NextResponse> => {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    throw new ValidationError("Invalid input", result.error.message);
  }

  const { email, token, password } = result.data;

  const commissioner = await prisma.commissioner.findUnique({ where: { email } });

  if (
    !commissioner ||
    commissioner.resetToken !== token ||
    !commissioner.resetTokenExpiry ||
    commissioner.resetTokenExpiry < new Date()
  ) {
    throw new ValidationError("Invalid or expired token");
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.commissioner.update({
    where: { email },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return NextResponse.json({ message: "Password reset successful" });
}, "ResetPassword");
