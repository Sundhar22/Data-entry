import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import prisma from "@/lib/prisma";

async function getFarmerByIdHandler(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    // Verify authentication
    const authResult = await requireAuth(req);
    if (!authResult.success) {
        return authResult.error!;
    }

    const userId = authResult.user!.id;
    const farmerId = params.id;

    const farmer = await prisma.farmer.findUnique({
        where: {
            id: farmerId,
            commissioner_id: userId
        },
        select: {
            id: true,
            name: true,
            phone: true,
            village: true,
            is_active: true,
            created_at: true,
            updated_at: true
        }
    });

    if (!farmer) {
        throw new NotFoundError("Farmer not found");
    }

    return createSuccessResponse(farmer);
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    return withErrorHandling(
        (req: NextRequest) => getFarmerByIdHandler(req, { params }),
        'Get Farmer by ID'
    )(req);
}