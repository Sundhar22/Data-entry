import { z } from "zod";

export const BillPreviewQuerySchema = z.object({
  farmer_id: z.string().min(1, "Farmer ID is required"),
  product_id: z.string().optional(),
  session_id: z.string().optional(),
});

export const BillGenerateRequestSchema = z.object({
  farmer_id: z.string().min(1, "Farmer ID is required"),
  previews: z.array(z.object({
    product_id: z.string().min(1, "Product ID is required"),
    session_id: z.string().min(1, "Session ID is required"),
    other_charges: z.record(z.string(), z.number().min(0)).optional(),
    notes: z.string().optional(),
  })).min(1, "At least one bill preview is required"),
});

export const BillPaymentRequestSchema = z.object({
  bill_ids: z.array(z.string().min(1)).min(1, "At least one bill ID is required"),
  payment_method: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
});

export const BillFilterSchema = z.object({
  farmer_id: z.string().optional(),
  product_id: z.string().optional(),
  session_id: z.string().optional(),
  payment_status: z.enum(['PAID', 'UNPAID']).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.enum(['created_at', 'bill_number', 'net_payable', 'payment_date']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
}).transform((data) => ({
  ...data,
  // Ensure payment_status is only set if it's valid
  payment_status: data.payment_status === 'PAID' || data.payment_status === 'UNPAID' ? data.payment_status : undefined,
}));

export type BillPreviewQuery = z.infer<typeof BillPreviewQuerySchema>;
export type BillGenerateRequest = z.infer<typeof BillGenerateRequestSchema>;
export type BillPaymentRequest = z.infer<typeof BillPaymentRequestSchema>;
export type BillFilter = z.infer<typeof BillFilterSchema>;
