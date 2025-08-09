import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { withErrorHandling } from "@/lib/error-handler";
import { createSuccessResponse, createPaginatedResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { BuyerApiSchema } from "@/schemas/buyer";
import { AuthenticatedRequest } from "@/types/auth";

// GET /api/buyer
async function listBuyersHandler(req: AuthenticatedRequest): Promise<NextResponse> {
  const userId = req.user.id;
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;
  const search = searchParams.get('search') || '';

  // Build where clause with search functionality
  const whereClause = {
    commissioner_id: userId,
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search, mode: 'insensitive' as const } }
      ]
    })
  };

  // Get buyers for this commissioner with pagination and search
  const [buyers, totalCount] = await Promise.all([
    prisma.buyer.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        phone: true,
        is_active: true,
        created_at: true,
        updated_at: true
      },
      skip,
      take: limit,
      orderBy: { created_at: "desc" }
    }),
    prisma.buyer.count({
      where: whereClause
    })
  ]);

  return createPaginatedResponse(buyers, page, limit, totalCount);
}

// POST /api/buyer
async function createBuyerHandler(req: AuthenticatedRequest): Promise<NextResponse> {
  const userId = req.user.id;
  const validator = validateRequest(BuyerApiSchema);
  const validation = await validator(req);
  if (!validation.success) return validation.response;

  const newBuyer = await prisma.buyer.create({
    data: {
      ...validation.data,
      commissioner_id: userId
    }
  });

  return createSuccessResponse(newBuyer, 201);
}

export const GET = withAuth(withErrorHandling(listBuyersHandler))

export const POST = withAuth(withErrorHandling(createBuyerHandler))

