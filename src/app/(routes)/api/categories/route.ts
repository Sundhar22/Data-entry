import { createSuccessResponse } from "@/lib/api-response";
import { withAuth } from "@/lib/auth"
import { withErrorHandling } from "@/lib/error-handler"
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";

async function getCategories(req: AuthenticatedRequest) {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
        },
        orderBy: { name: 'asc' }
    });

    return createSuccessResponse(categories);
}

export const GET = withAuth(withErrorHandling(getCategories, 'Get Categories'));
