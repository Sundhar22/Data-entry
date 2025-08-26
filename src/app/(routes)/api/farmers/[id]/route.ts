import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { UpdateFarmerSchema, UpdateFarmer } from "@/schemas/farmer";

async function getFarmerByIdHandler(
  req: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const userId = req.user.id;
  const { id: farmerId } = await params;

  const farmer = await prisma.farmer.findUnique({
    where: {
      id: farmerId,
      commissioner_id: userId,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      village: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!farmer) {
    throw new NotFoundError("Farmer not found");
  }

  return createSuccessResponse(farmer);
}

// PUT /api/farmers/:id
async function updateFarmerByIdHandler(
  req: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const userId = req.user.id;
  const { id: farmerId } = await params;

  const validator = validateRequest(UpdateFarmerSchema);
  const validation = await validator(req);

  if (!validation.success) {
    return validation.response;
  }

  const validatedData: UpdateFarmer = validation.data;

  const existingFarmer = await prisma.farmer.findUnique({
    where: { id: farmerId, commissioner_id: userId },
  });

  if (!existingFarmer) {
    throw new NotFoundError("Farmer not found");
  }

  const updatedFarmer = await prisma.farmer.update({
    where: { id: farmerId, commissioner_id: userId },
    data: {
      name: validatedData.name || existingFarmer.name,
      phone: validatedData.phone || existingFarmer.phone,
      village: validatedData.village || existingFarmer.village,
      is_active:
        validatedData.is_active !== undefined
          ? validatedData.is_active
          : existingFarmer.is_active,
    },
  });

  return createSuccessResponse(updatedFarmer);
}

// DELETE /api/farmers/:id
async function deleteFarmerByIdHandler(
  req: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const userId = req.user.id;
  const { id: farmerId } = await params;

  const existingFarmer = await prisma.farmer.findUnique({
    where: { id: farmerId, commissioner_id: userId },
  });

  if (!existingFarmer) {
    throw new NotFoundError("Farmer not found");
  }

  await prisma.farmer.delete({
    where: { id: farmerId, commissioner_id: userId },
  });

  return new NextResponse(null, { status: 204 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => getFarmerByIdHandler(req, { params }),
      "Get Farmer by ID",
    ),
  )(req);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => updateFarmerByIdHandler(req, { params }),
      "Update Farmer by ID",
    ),
  )(req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => deleteFarmerByIdHandler(req, { params }),
      "Delete Farmer by ID",
    ),
  )(req);
}
