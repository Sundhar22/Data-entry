import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { UpdateBuyerApiSchema } from "@/schemas/buyer";
import { validateRequest } from "@/lib/validation";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { AuthenticatedRequest } from "@/types/auth";

async function getBuyerHandler(req: AuthenticatedRequest, {params}: { params: { id: string } }): Promise<NextResponse> {
  const buyerId = context.params.id;

  const buyer = await prisma.buyer.findUnique({
    where: { id: buyerId },
    select: {
      id: true,
      name: true,
      phone: true,
      commissioner_id: true,
      is_active: true,
      created_at: true,
      updated_at: true
    }
  });

  if (!buyer) {
    throw new NotFoundError("Buyer not found");
  }

  return createSuccessResponse(buyer);
}

async function updateBuyerHandler(req: AuthenticatedRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const buyerId = context.params.id;

  const validator = validateRequest(UpdateBuyerApiSchema);
  const validation = await validator(req);

  if (!validation.success) {
    return validation.response;
  }

  const validatedData = validation.data;

  const existingBuyer = await prisma.buyer.findUnique({
    where: { id: buyerId }
  });

  if (!existingBuyer) {
    throw new NotFoundError("Buyer not found");
  }

  const updatedBuyer = await prisma.buyer.update({
    where: { id: buyerId },
    data: {
      name: validatedData.name,
      phone: validatedData.phone,
      commissioner_id: validatedData.commissioner_id,
      is_active: validatedData.is_active ?? existingBuyer.is_active,
    }
  });

  return createSuccessResponse(updatedBuyer);
}

async function deleteBuyerHandler(req: AuthenticatedRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const buyerId = context.params.id;

  const existingBuyer = await prisma.buyer.findUnique({ where: { id: buyerId } });

  if (!existingBuyer) {
    throw new NotFoundError("Buyer not found");
  }

  await prisma.buyer.delete({ where: { id: buyerId } });

  return new NextResponse(null, { status: 204 });
}

// Export protected + error-handled handlers
export const GET = withAuth(withErrorHandling(getBuyerHandler, 'Get Buyer'));
export const PUT = withAuth(withErrorHandling(updateBuyerHandler, 'Update Buyer'));
export const DELETE = withAuth(withErrorHandling(deleteBuyerHandler, 'Delete Buyer'));
