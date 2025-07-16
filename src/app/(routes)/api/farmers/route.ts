import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest, validateQueryParams, PaginationSchema } from "@/lib/validation";
import { CreateFarmerSchema } from "@/schemas/farmer";

// GET /api/farmers - List all farmers with pagination
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Validate pagination parameters
    const paginationValidation = validateQueryParams(PaginationSchema, searchParams);
    
    if (!paginationValidation.success) {
      return NextResponse.json(
        { 
          error: "Invalid pagination parameters",
          errors: paginationValidation.errors 
        },
        { status: 400 }
      );
    }

    const { page, limit, sortBy, sortOrder } = paginationValidation.data!;
    const skip = (page - 1) * limit;

    // Build order by clause
    const orderBy: any = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.created_at = 'desc'; // Default sort
    }

    // Get farmers with pagination
    const [farmers, totalCount] = await Promise.all([
      prisma.farmer.findMany({
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          name: true,
          village: true,
          phone: true,
          commissioner_id: true,
          is_active: true,
          created_at: true,
          updated_at: true,
          commissioner: {
            select: {
              id: true,
              name: true,
              location: true,
            }
          }
        },
      }),
      prisma.farmer.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: farmers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });

  } catch (error) {
    console.error('Error fetching farmers:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/farmers - Create new farmer
export async function POST(req: NextRequest) {
  try {
    const validator = validateRequest(CreateFarmerSchema);
    const validation = await validator(req);

    if (!validation.success) {
      return validation.response;
    }

    const farmerData = validation.data;

    // Check if farmer with same phone already exists
    const existingFarmer = await prisma.farmer.findFirst({
      where: { phone: farmerData.phone }
    });

    if (existingFarmer) {
      return NextResponse.json(
        { error: "Farmer with this phone number already exists" },
        { status: 409 }
      );
    }

    // Verify commissioner exists
    const commissioner = await prisma.commissioner.findUnique({
      where: { id: farmerData.commissioner_id }
    });

    if (!commissioner) {
      return NextResponse.json(
        { error: "Commissioner not found" },
        { status: 404 }
      );
    }

    // Create new farmer
    const newFarmer = await prisma.farmer.create({
      data: farmerData,
      include: {
        commissioner: {
          select: {
            id: true,
            name: true,
            location: true,
          }
        }
      },
    });

    return NextResponse.json(
      { 
        success: true,
        data: newFarmer,
        message: "Farmer created successfully" 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating farmer:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
