import { createSuccessResponse } from "@/lib/api-response";
import { withAuth } from "@/lib/auth";
import { withErrorHandling } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";

async function getProducts(req: AuthenticatedRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit") || "10");

  const whereClause = {
    is_active: true,
    ...(query && {
      name: {
        contains: query,
        mode: "insensitive" as const,
      },
    }),
  };

  const products = await prisma.product.findMany({
    where: whereClause,
    select: {
      id: true,
      name: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: limit,
  });

  return createSuccessResponse(products);
}

export const GET = withAuth(withErrorHandling(getProducts, "Get Products"));
