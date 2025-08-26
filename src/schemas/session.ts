import { z } from "zod";

// Session status enum schema
export const SessionStatusSchema = z.enum(["ACTIVE", "COMPLETED"]);

// Create session schema
export const CreateSessionSchema = z.object({
  date: z.coerce
    .date()
    .optional()
    .default(() => new Date()),
});

// Update session schema
export const UpdateSessionSchema = z.object({
  status: SessionStatusSchema.optional(),
  date: z.coerce.date().optional(),
});

// Session filter schema for listing
export const SessionFilterSchema = z.object({
  status: SessionStatusSchema.optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.enum(["date", "created_at", "updated_at"]).default("date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Type exports
export type CreateSessionData = z.infer<typeof CreateSessionSchema>;
export type UpdateSessionData = z.infer<typeof UpdateSessionSchema>;
export type SessionFilters = z.infer<typeof SessionFilterSchema>;
export type SessionStatus = z.infer<typeof SessionStatusSchema>;
