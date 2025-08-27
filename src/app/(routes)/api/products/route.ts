import { createPaginatedResponse } from "@/lib/api-response";
import { withAuth } from "@/lib/auth";
import { withErrorHandling } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";

async function getProducts(req: AuthenticatedRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const whereClause = {
    is_active: true,
    ...(query && {
      name: {
        contains: query,
        mode: "insensitive" as const,
      },
    }),
  };

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
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
      skip,
      take: limit,
      orderBy: { name: "asc" },
    }),
    prisma.product.count({ where: whereClause }),
  ]);

  return createPaginatedResponse(products, page, limit, totalCount);
}

export const GET = withAuth(
  withErrorHandling(async (req) => {
    const res = await getProducts(req);
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }, "Get Products"),
);
