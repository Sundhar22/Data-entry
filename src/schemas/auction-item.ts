import { z } from 'zod';

// Define Unit enum manually to match Prisma schema
const Unit = z.enum(['KG', 'GRAM', 'QUINTAL', 'TON', 'BUNDLE', 'PIECE', 'LITRE', 'MILLILITRE', 'GALLON', 'DOZEN', 'BOX', 'BAG', 'OTHER']);

// Auction Item Creation Schema (buyer_id and rate are optional for partial creation)
export const CreateAuctionItemSchema = z.object({
  farmer_id: z.string().cuid('Invalid farmer ID format'),
  product_id: z.string().cuid('Invalid product ID format'),
  buyer_id: z.string().cuid('Invalid buyer ID format').optional(),
  unit: Unit,
  quantity: z.number().positive('Quantity must be positive'),
  rate: z.number().positive('Rate must be positive').optional()
});

// Auction Item Update Schema (all fields optional)
export const UpdateAuctionItemSchema = z.object({
  farmer_id: z.string().cuid('Invalid farmer ID format').optional(),
  product_id: z.string().cuid('Invalid product ID format').optional(),
  buyer_id: z.string().cuid('Invalid buyer ID format').optional(),
  unit: Unit.optional(),
  quantity: z.number().positive('Quantity must be positive').optional(),
  rate: z.number().positive('Rate must be positive').optional()
});

// Complete Auction Item Schema (for completing partial items with buyer and rate)
export const CompleteAuctionItemSchema = z.object({
  buyer_id: z.string().cuid('Invalid buyer ID format'),
  rate: z.number().positive('Rate must be positive')
});

// Auction Item Filter Schema for listing
export const AuctionItemFilterSchema = z.object({
  farmer_id: z.string().cuid().optional(),
  product_id: z.string().cuid().optional(),
  buyer_id: z.string().cuid().optional(),
  paid: z.enum(['true', 'false']).optional(), // Filter by payment status
  completed: z.enum(['true', 'false']).optional(), // Filter by completion status (has buyer and rate)
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  sortBy: z.enum(['created_at', 'rate', 'quantity']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Type exports
export type CreateAuctionItemData = z.infer<typeof CreateAuctionItemSchema>;
export type UpdateAuctionItemData = z.infer<typeof UpdateAuctionItemSchema>;
export type CompleteAuctionItemData = z.infer<typeof CompleteAuctionItemSchema>;
export type AuctionItemFilters = z.infer<typeof AuctionItemFilterSchema>;
