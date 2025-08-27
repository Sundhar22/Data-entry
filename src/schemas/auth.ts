import { z } from "zod";

// Signup schema
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  location: z.string().min(1, "Location is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long")
    .regex(
      /^\+?\d{10,14}$/,
      "Phone number must contain only digits (with optional + prefix)",
    ),
});

// Login schema
export const loginSchema = z.object({
  email: z.email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

// Reset password schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Type exports
export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
