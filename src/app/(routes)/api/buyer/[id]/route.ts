import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { BuyerApiSchema } from "@/schemas/buyer";
import { createSuccessResponse } from "@/lib/api-response";
import { AuthenticatedRequest } from "@/types/auth";

// GET /api/buyers/:id
async function getBuyerByIdHandler(
  _req: AuthenticatedRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const userId = _req.user.id;
  const buyer = await prisma.buyer.findUnique({ where: { id: params.id, commissioner_id: userId } });
  if (!buyer) throw new NotFoundError("Buyer not found");
  return createSuccessResponse(buyer);
}

// PUT /api/buyers/:id
async function updateBuyerByIdHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const userId = req.user.id;
  const validator = validateRequest(BuyerApiSchema);
  const validation = await validator(req);
  if (!validation.success) return validation.response;

  const existing = await prisma.buyer.findUnique({ where: { id: params.id, commissioner_id: userId } });
  if (!existing) throw new NotFoundError("Buyer not found");

  const updated = await prisma.buyer.update({
    where: { id: params.id, commissioner_id: userId },
    data: {
      ...validation.data,
      is_active: validation.data.is_active ?? existing.is_active
    }
  });

  return createSuccessResponse(updated);
}

// DELETE /api/buyers/:id
async function deleteBuyerByIdHandler(
  _req: AuthenticatedRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const userId = _req.user.id;
  const existing = await prisma.buyer.findUnique({ where: { id: params.id, commissioner_id: userId } });
  if (!existing) throw new NotFoundError("Buyer not found");

  await prisma.buyer.delete({ where: { id: params.id, commissioner_id: userId} });
  return new NextResponse(null, { status: 204 });
}

// Handler exports
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => getBuyerByIdHandler(req, { params }),
      "Get Buyer by ID"
    )
  )(req);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => updateBuyerByIdHandler(req, { params }),
      "Update Buyer by ID"
    )
  )(req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => deleteBuyerByIdHandler(req, { params }),
      "Delete Buyer by ID"
    )
  )(req);
}
