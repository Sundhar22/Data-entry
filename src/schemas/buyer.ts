// schemas/buyer.ts
import { z } from "zod";

export const UpdateBuyerApiSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  commissioner_id: z.string().cuid(),
  is_active: z.boolean().optional()
});

export type UpdateBuyerApiInput = z.infer<typeof UpdateBuyerApiSchema>;
