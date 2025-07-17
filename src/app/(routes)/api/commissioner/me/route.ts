import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { UpdateCommissionerApiSchema } from "@/schemas/commissioner";
import { validateRequest } from "@/lib/validation";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { AuthenticatedRequest } from "@/types/auth";

async function getCommissionerHandler(req: AuthenticatedRequest): Promise<NextResponse> {
  const userId = req.user.id;

  console.log('Looking for commissioner with ID:', userId);

  const commissioner = await prisma.commissioner.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      commission_rate: true,
      location: true,
      created_at: true,
      updated_at: true
    }
  });

  console.log('Commissioner found:', commissioner);

  if (!commissioner) {
    console.log('Commissioner not found');
    throw new NotFoundError("Commissioner not found");
  }

  return createSuccessResponse(commissioner);
}

async function updateCommissionerHandler(req: AuthenticatedRequest): Promise<NextResponse> {
  const userId = req.user.id;

  // Validate the request body using Zod
  const validator = validateRequest(UpdateCommissionerApiSchema);
  const validation = await validator(req);

  if (!validation.success) {
    return validation.response;
  }

  const validatedData = validation.data;

  const existingCommissioner = await prisma.commissioner.findUnique({
    where: { id: userId }
  });

  if (!existingCommissioner) {
    console.log('Commissioner not found');
    throw new NotFoundError("Commissioner not found");
  }

  const updatedCommissioner = await prisma.commissioner.update({
    where: { id: userId },
    data: {
      name: validatedData.name || existingCommissioner.name,
      email: validatedData.email || existingCommissioner.email,
      phone: validatedData.phone || existingCommissioner.phone,
      location: validatedData.location || existingCommissioner.location,
      commission_rate: validatedData.commission_rate !== undefined ? validatedData.commission_rate : existingCommissioner.commission_rate,
    }
  });

  return createSuccessResponse(updatedCommissioner);
}

// Export the protected routes
export const GET = withAuth(withErrorHandling(getCommissionerHandler, 'Get Commissioner'));
export const PUT = withAuth(withErrorHandling(updateCommissionerHandler, 'Update Commissioner'));
