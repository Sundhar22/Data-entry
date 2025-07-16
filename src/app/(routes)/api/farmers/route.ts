import { requireAuth, withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";
import { UpdateFarmer, UpdateFarmerSchema, CreateFarmer, CreateFarmerSchema } from "@/schemas/farmer";
import { validateRequest } from "@/lib/validation";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        // Verify authentication
        const authResult = await requireAuth(req);
        if (!authResult.success) {
            return authResult.error!;
        }

        const userId = authResult.user!.id;
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

        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            farmers,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error('Error in /api/farmers:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Verify authentication
        const authResult = await requireAuth(req);
        if (!authResult.success) {
            return authResult.error!;
        }

        const userId = authResult.user!.id;

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

        return NextResponse.json(farmer, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/farmers:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function updateFarmerSchema(req: AuthenticatedRequest): Promise<NextResponse> {

    try {
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
            console.log('Farmer not found');
            return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
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

        return NextResponse.json(updatedFarmer, { status: 200 });
    } catch (error) {
        console.error('Error in PUT /api/farmers:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function deleteFarmer(req: AuthenticatedRequest): Promise<NextResponse> {
    try {
        const userId = req.user.id;
        const { id } = await req.json();

        const existingFarmer = await prisma.farmer.findUnique({
            where: { id, commissioner_id: userId }
        });

        if (!existingFarmer) {
            console.log('Farmer not found');
            return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
        }

        await prisma.farmer.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Farmer deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error in DELETE /api/farmers:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export const PUT = withAuth(updateFarmerSchema);
export const DELETE = withAuth(deleteFarmer);