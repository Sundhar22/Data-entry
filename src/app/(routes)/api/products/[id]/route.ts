import { createSuccessResponse, createErrorResponse } from "@/lib/api-response";
import { withAuth } from "@/lib/auth";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

async function getProduct(
  req: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return createSuccessResponse(product);
}

async function updateProduct(
  req: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const body = await req.json();
  const { name, category_id, is_active } = body;

  // Validate required fields
  if (!name || !category_id) {
    return createErrorResponse("Name and category are required", 400);
  }

  // Check if product exists
  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new NotFoundError("Product not found");
  }

  // Check if category exists
  const categoryExists = await prisma.category.findUnique({
    where: { id: category_id },
  });

  if (!categoryExists) {
    return createErrorResponse("Category not found", 400);
  }

  // Check for duplicate name (excluding current product)
  const duplicateName = await prisma.product.findFirst({
    where: {
      name: name.trim(),
      id: { not: id },
    },
  });

  if (duplicateName) {
    return createErrorResponse("Product with this name already exists", 409);
  }

  // Update product
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: name.trim(),
      category_id,
      is_active:
        is_active !== undefined ? is_active : existingProduct.is_active,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return createSuccessResponse(updatedProduct);
}

async function deleteProduct(
  req: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  // Check if product is used in any auction items or bills
  const auctionItemsCount = await prisma.auctionItem.count({
    where: { product_id: id },
  });

  const billsCount = await prisma.bill.count({
    where: { product_id: id },
  });

  if (auctionItemsCount > 0 || billsCount > 0) {
    return createErrorResponse(
      "Cannot delete product that is used in auctions or bills",
      400,
    );
  }

  // Delete product
  await prisma.product.delete({
    where: { id },
  });

  return createSuccessResponse({ message: "Product deleted successfully" });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => getProduct(req, { params }),
      "Get Product",
    ),
  )(req);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => updateProduct(req, { params }),
      "Update Product",
    ),
  )(req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling(
      (req: AuthenticatedRequest) => deleteProduct(req, { params }),
      "Delete Product",
    ),
  )(req);
}
