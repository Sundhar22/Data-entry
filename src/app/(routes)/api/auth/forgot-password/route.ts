import { z } from "zod";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { sendResetEmail } from "@/lib/mail";
import { withErrorHandling, ValidationError } from "@/lib/error-handler";
import { NextResponse } from "next/server";

const schema = z.object({
  email: z.email(),
});

export const POST = withErrorHandling(async (req: Request): Promise<NextResponse> => {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    throw new ValidationError("Invalid email format", result.error.message);
  }

  const { email } = result.data;

  const commissioner = await prisma.commissioner.findUnique({ where: { email } });

  if (!commissioner) {
    // Return generic success response to prevent user enumeration
    return NextResponse.json({ message: "If this email exists, a reset link has been sent" });
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.commissioner.update({
    where: { email },
    data: { resetToken: token, resetTokenExpiry: expires },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/commissioner/reset-password?token=${token}&email=${email}`;
  await sendResetEmail(email, resetLink);

  return NextResponse.json({ message: "If this email exists, a reset link has been sent" });
}, "ForgotPassword");
