import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { UpdateFarmerSchema } from "@/schemas/farmer";

// GET /api/farmers/[id] - Get farmer details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Farmer ID is required" },
        { status: 400 }
      );
    }

    const farmer = await prisma.farmer.findUnique({
      where: { id },
      include: {
        commissioner: {
          select: {
            id: true,
            name: true,
            location: true,
            phone: true,
          }
        },
        auction_items: {
          select: {
            id: true,
            quantity: true,
            final_price: true,
            unit: true,
            created_at: true,
            product: {
              select: {
                id: true,
                name: true,
                category: {
                  select: {
                    name: true,
                  }
                }
              }
            }
          },
          orderBy: {
            created_at: 'desc'
          },
          take: 10 // Get recent 10 auction items
        },
        bills: {
          select: {
            id: true,
            total_amount: true,
            commission_amount: true,
            created_at: true,
          },
          orderBy: {
            created_at: 'desc'
          },
          take: 10 // Get recent 10 bills
        }
      },
    });

    if (!farmer) {
      return NextResponse.json(
        { error: "Farmer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: farmer,
    });

  } catch (error) {
    console.error('Error fetching farmer:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/farmers/[id] - Update farmer
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Farmer ID is required" },
        { status: 400 }
      );
    }

    const validator = validateRequest(UpdateFarmerSchema.omit({ id: true }));
    const validation = await validator(req);

    if (!validation.success) {
      return validation.response;
    }

    const updateData = validation.data;

    // Check if farmer exists
    const existingFarmer = await prisma.farmer.findUnique({
      where: { id }
    });

    if (!existingFarmer) {
      return NextResponse.json(
        { error: "Farmer not found" },
        { status: 404 }
      );
    }

    // Check if phone number is being updated and already exists
    if (updateData.phone && updateData.phone !== existingFarmer.phone) {
      const phoneExists = await prisma.farmer.findFirst({
        where: { 
          phone: updateData.phone,
          NOT: { id }
        }
      });

      if (phoneExists) {
        return NextResponse.json(
          { error: "Phone number already exists" },
          { status: 409 }
        );
      }
    }

    // If commissioner_id is being updated, verify it exists
    if (updateData.commissioner_id) {
      const commissioner = await prisma.commissioner.findUnique({
        where: { id: updateData.commissioner_id }
      });

      if (!commissioner) {
        return NextResponse.json(
          { error: "Commissioner not found" },
          { status: 404 }
        );
      }
    }

    // Update farmer
    const updatedFarmer = await prisma.farmer.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({
      success: true,
      data: updatedFarmer,
      message: "Farmer updated successfully",
    });

  } catch (error) {
    console.error('Error updating farmer:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/farmers/[id] - Delete farmer
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Farmer ID is required" },
        { status: 400 }
      );
    }

    // Check if farmer exists
    const existingFarmer = await prisma.farmer.findUnique({
      where: { id },
      include: {
        auction_items: { select: { id: true } },
        bills: { select: { id: true } }
      }
    });

    if (!existingFarmer) {
      return NextResponse.json(
        { error: "Farmer not found" },
        { status: 404 }
      );
    }

    // Check if farmer has related records
    if (existingFarmer.auction_items.length > 0 || existingFarmer.bills.length > 0) {
      return NextResponse.json(
        { 
          error: "Cannot delete farmer with existing auction items or bills. Please remove related records first." 
        },
        { status: 409 }
      );
    }

    // Delete farmer
    await prisma.farmer.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: "Farmer deleted successfully",
    });

  } catch (error) {
    console.error('Error deleting farmer:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
