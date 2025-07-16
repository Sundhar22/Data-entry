import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
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
            return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
        }

        return NextResponse.json(farmer, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/farmers/:id:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}