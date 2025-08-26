// schemas/buyer.ts
import { z } from "zod";

export const BuyerApiSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  is_active: z.boolean().optional(),
});

export type BuyerApiInput = z.infer<typeof BuyerApiSchema>;
