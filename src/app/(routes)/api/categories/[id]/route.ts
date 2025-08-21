import { createSuccessResponse, createErrorResponse } from "@/lib/api-response";
import { withAuth } from "@/lib/auth"
import { withErrorHandling, NotFoundError } from "@/lib/error-handler"
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

async function getCategory(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const { id } = await params;

    const category = await prisma.category.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            _count: {
                select: {
                    products: true
                }
            }
        }
    });

    if (!category) {
        throw new NotFoundError('Category not found');
    }

    // Transform the response to include product_count
    const transformedCategory = {
        id: category.id,
        name: category.name,
        created_at: category.created_at,
        updated_at: category.updated_at,
        product_count: category._count.products
    };

    return createSuccessResponse(transformedCategory);
}

async function updateCategory(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const { id } = await params;
    const body = await req.json();
    const { name } = body;

    // Validate required fields
    if (!name || !name.trim()) {
        return createErrorResponse('Category name is required', 400);
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
        where: { id }
    });

    if (!existingCategory) {
        throw new NotFoundError('Category not found');
    }

    // Check for duplicate name (excluding current category)
    const duplicateName = await prisma.category.findFirst({
        where: {
            name: name.trim(),
            id: { not: id }
        }
    });

    if (duplicateName) {
        return createErrorResponse('Category with this name already exists', 409);
    }

    // Update category
    const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
            name: name.trim()
        },
        select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            _count: {
                select: {
                    products: true
                }
            }
        }
    });

    // Transform the response to include product_count
    const transformedCategory = {
        id: updatedCategory.id,
        name: updatedCategory.name,
        created_at: updatedCategory.created_at,
        updated_at: updatedCategory.updated_at,
        product_count: updatedCategory._count.products
    };

    return createSuccessResponse(transformedCategory);
}

async function deleteCategory(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const { id } = await params;

    // Check if category exists
    const category = await prisma.category.findUnique({
        where: { id },
        select: {
            id: true,
            _count: {
                select: {
                    products: true
                }
            }
        }
    });

    if (!category) {
        throw new NotFoundError('Category not found');
    }

    // Check if category has products
    if (category._count.products > 0) {
        return createErrorResponse('Cannot delete category that has products', 400);
    }

    // Delete category
    await prisma.category.delete({
        where: { id }
    });

    return createSuccessResponse({ message: 'Category deleted successfully' });
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => getCategory(req, { params }),
        'Get Category'
    ))(req);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => updateCategory(req, { params }),
        'Update Category'
    ))(req);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => deleteCategory(req, { params }),
        'Delete Category'
    ))(req);
}
