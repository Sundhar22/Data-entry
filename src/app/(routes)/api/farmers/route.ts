import { withAuth } from "@/lib/auth";
import {  NextResponse } from "next/server";
import { createSuccessResponse, createPaginatedResponse } from "@/lib/api-response";
import { withErrorHandling } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";
import { CreateFarmer, CreateFarmerSchema } from "@/schemas/farmer";
import { validateRequest } from "@/lib/validation";

async function getFarmersHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const search = searchParams.get('search') || '';
    const activeOnly = searchParams.get('active') === 'true';

    // Build where clause with search functionality
    const whereClause = {
        commissioner_id: userId,
        ...(activeOnly && { is_active: true }),
        ...(search && {
            OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { phone: { contains: search, mode: 'insensitive' as const } },
                { village: { contains: search, mode: 'insensitive' as const } }
            ]
        })
    };

    // Get farmers for this commissioner with pagination and search
    const [farmers, totalCount] = await Promise.all([
        prisma.farmer.findMany({
            where: whereClause,
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
            where: whereClause
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

export const GET = withAuth(withErrorHandling(getFarmersHandler, 'Get Farmers'));
export const POST = withAuth(withErrorHandling(createFarmerHandler, 'Create Farmer'));