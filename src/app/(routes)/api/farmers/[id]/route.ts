import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";

async function getFarmerByIdHandler(
    req: AuthenticatedRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const userId = req.user.id;
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
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => getFarmerByIdHandler(req, { params }),
        'Get Farmer by ID'
    ))(req);
}