// schemas/buyer.ts
import { z } from "zod";

export const BuyerApiSchema = z.object({
  name: z.string().min(1),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/,
      "Phone must be 10 digits, optionally prefixed by country code"),
  is_active: z.boolean().optional(),
});

export type BuyerApiInput = z.infer<typeof BuyerApiSchema>;
