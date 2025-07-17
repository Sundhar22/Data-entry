import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse, createPaginatedResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";
import { UpdateFarmer, UpdateFarmerSchema, CreateFarmer, CreateFarmerSchema } from "@/schemas/farmer";
import { validateRequest } from "@/lib/validation";

async function getFarmersHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get farmers for this commissioner with pagination
    const [farmers, totalCount] = await Promise.all([
        prisma.farmer.findMany({
            where: { commissioner_id: userId },
            select: {
                id: true,
                name: true,
                phone: true,
                village: true,
                is_active: true,
                created_at: true,
                updated_at: true
            },
            skip,
            take: limit,
            orderBy: { created_at: 'desc' }
        }),
        prisma.farmer.count({
            where: { commissioner_id: userId }
        })
    ]);

    return createPaginatedResponse(farmers, page, limit, totalCount);
}

async function createFarmerHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;

    // Validate request body
    const validator = validateRequest(CreateFarmerSchema);
    const validation = await validator(req);

    if (!validation.success) {
        return validation.response;
    }
    const validatedData: CreateFarmer = validation.data;

    // Create farmer for this commissioner
    const farmer = await prisma.farmer.create({
        data: {
            ...validatedData,
            commissioner_id: userId
        }
    });

    return createSuccessResponse(farmer, 201);
}

async function updateFarmerHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;

    const validator = validateRequest(UpdateFarmerSchema);
    const validation = await validator(req);

    if (!validation.success) {
        return validation.response;
    }
    const validatedData: UpdateFarmer = validation.data;

    const existingFarmer = await prisma.farmer.findUnique({
        where: { id: validatedData.id, commissioner_id: userId }
    });

    if (!existingFarmer) {
        throw new NotFoundError('Farmer not found');
    }

    const updatedFarmer = await prisma.farmer.update({
        where: { id: validatedData.id },
        data: {
            name: validatedData.name || existingFarmer.name,
            phone: validatedData.phone || existingFarmer.phone,
            village: validatedData.village || existingFarmer.village,
            is_active: validatedData.is_active !== undefined ? validatedData.is_active : existingFarmer.is_active
        }
    });

    return createSuccessResponse(updatedFarmer);
}

async function deleteFarmerHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;
    const { id } = await req.json();

    const existingFarmer = await prisma.farmer.findUnique({
        where: { id, commissioner_id: userId }
    });

    if (!existingFarmer) {
        throw new NotFoundError('Farmer not found');
    }

    await prisma.farmer.delete({
        where: { id }
    });

    return createSuccessResponse({ message: "Farmer deleted successfully" });
}

export const GET = withAuth(withErrorHandling(getFarmersHandler, 'Get Farmers'));
export const POST = withAuth(withErrorHandling(createFarmerHandler, 'Create Farmer'));
export const PUT = withAuth(withErrorHandling(updateFarmerHandler, 'Update Farmer'));
export const DELETE = withAuth(withErrorHandling(deleteFarmerHandler, 'Delete Farmer'));