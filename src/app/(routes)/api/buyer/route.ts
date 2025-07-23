import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { withErrorHandling } from "@/lib/error-handler";
import { createSuccessResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { BuyerApiSchema } from "@/schemas/buyer";
import { AuthenticatedRequest } from "@/types/auth";

// GET /api/buyers
async function listBuyersHandler(_req: AuthenticatedRequest): Promise<NextResponse> {
  const buyers = await prisma.buyer.findMany({
    orderBy: { created_at: "desc" }
  });
  return createSuccessResponse(buyers);
}

// POST /api/buyers
async function createBuyerHandler(req: AuthenticatedRequest): Promise<NextResponse> {
  const validator = validateRequest(BuyerApiSchema);
  const validation = await validator(req);
  if (!validation.success) return validation.response;

  const newBuyer = await prisma.buyer.create({
    data: validation.data
  });

  return createSuccessResponse(newBuyer, 201);
}

export const GET = withAuth(withErrorHandling(listBuyersHandler))

export const POST = withAuth(withErrorHandling(createBuyerHandler))

