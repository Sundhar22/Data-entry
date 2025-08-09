import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError, ConflictError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { UpdateAuctionItemSchema } from "@/schemas/auction-item";

/**
 * GET /api/sessions/[id]/items/[itemId]
 * Get a specific auction item by ID
 */
async function getAuctionItemByIdHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId, itemId } = await params;

    // Verify session exists and belongs to commissioner
    const session = await prisma.auctionSession.findFirst({
        where: {
            id: sessionId,
            commissioner_id: userId
        },
        select: { id: true }
    });

    if (!session) {
        throw new NotFoundError('Session not found');
    }

    // Get auction item
    const auctionItem = await prisma.auctionItem.findFirst({
        where: {
            id: itemId,
            session_id: sessionId
        },
        include: {
            farmer: {
                select: {
                    id: true,
                    name: true,
                   /*  phone: true,
                    village: true */
                }
            },
            product: {
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            buyer: {
                select: {
                    id: true,
                    name: true,
                   /*  phone: true */
                }
            },
            /* bill: {
                select: {
                    id: true,
                    bill_number: true,
                    payment_date: true,
                    gross_amount: true,
                    commission_amount: true,
                    net_payable: true
                }
            } */
        }
    });

    if (!auctionItem) {
        throw new NotFoundError('Auction item not found');
    }

    return createSuccessResponse(auctionItem);
}

/**
 * PUT /api/sessions/[id]/items/[itemId]
 * Update a specific auction item
 */
async function updateAuctionItemHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId, itemId } = await params;

    // Validate request body
    const validator = validateRequest(UpdateAuctionItemSchema);
    const validation = await validator(req);

    if (!validation.success) {
        return validation.response;
    }

    const validatedData = validation.data;

    try {
        // Verify session exists, belongs to commissioner, and is ACTIVE
        const session = await prisma.auctionSession.findFirst({
            where: {
                id: sessionId,
                commissioner_id: userId
            },
            select: {
                id: true,
                status: true
            }
        });

        if (!session) {
            throw new NotFoundError('Session not found');
        }

        if (session.status !== 'ACTIVE') {
            throw new ConflictError('Cannot update items in non-active session');
        }

        // Check if auction item exists and isn't already paid
        const existingItem = await prisma.auctionItem.findFirst({
            where: {
                id: itemId,
                session_id: sessionId
            },
            select: {
                id: true,
                bill_id: true
            }
        });

        if (!existingItem) {
            throw new NotFoundError('Auction item not found');
        }

        if (existingItem.bill_id) {
            throw new ConflictError('Cannot update auction item that has already been paid');
        }

        // If updating farmer, verify farmer belongs to commissioner
        if (validatedData.farmer_id) {
            const farmer = await prisma.farmer.findFirst({
                where: {
                    id: validatedData.farmer_id,
                    commissioner_id: userId,
                    is_active: true
                }
            });

            if (!farmer) {
                throw new NotFoundError('Farmer not found or not active');
            }
        }

        // If updating buyer, verify buyer belongs to commissioner
        if (validatedData.buyer_id) {
            const buyer = await prisma.buyer.findFirst({
                where: {
                    id: validatedData.buyer_id,
                    commissioner_id: userId,
                    is_active: true
                }
            });

            if (!buyer) {
                throw new NotFoundError('Buyer not found or not active');
            }
        }

        // If updating product, verify product exists and is active
        if (validatedData.product_id) {
            const product = await prisma.product.findFirst({
                where: {
                    id: validatedData.product_id,
                    is_active: true
                }
            });

            if (!product) {
                throw new NotFoundError('Product not found or not active');
            }
        }

        // Update auction item
        const updatedItem = await prisma.auctionItem.update({
            where: {
                id: itemId
            },
            data: {
                ...(validatedData.farmer_id && { farmer_id: validatedData.farmer_id }),
                ...(validatedData.product_id && { product_id: validatedData.product_id }),
                ...(validatedData.buyer_id && { buyer_id: validatedData.buyer_id }),
                ...(validatedData.unit && { unit: validatedData.unit }),
                ...(validatedData.quantity && { quantity: validatedData.quantity }),
                ...(validatedData.rate && { rate: validatedData.rate })
            },
            include: {
                farmer: {
                    select: {
                        id: true,
                        name: true,
                        // phone: true,
                        // village: true
                    }
                },
                product: {
                    include: {
                        category: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        // phone: true
                    }
                }
            }
        });

        return createSuccessResponse(updatedItem);
    } catch (error) {
        throw new Error(`Failed to update auction item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * DELETE /api/sessions/[id]/items/[itemId]
 * Delete a specific auction item
 */
async function deleteAuctionItemHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId, itemId } = await params;

    try {
        // Verify session exists, belongs to commissioner, and is ACTIVE
        const session = await prisma.auctionSession.findFirst({
            where: {
                id: sessionId,
                commissioner_id: userId
            },
            select: {
                id: true,
                status: true
            }
        });

        if (!session) {
            throw new NotFoundError('Session not found');
        }

        if (session.status !== 'ACTIVE') {
            throw new ConflictError('Cannot delete items from non-active session');
        }

        // Check if auction item exists and isn't already paid
        const existingItem = await prisma.auctionItem.findFirst({
            where: {
                id: itemId,
                session_id: sessionId
            },
            select: {
                id: true,
                bill_id: true
            }
        });

        if (!existingItem) {
            throw new NotFoundError('Auction item not found');
        }

        if (existingItem.bill_id) {
            throw new ConflictError('Cannot delete auction item that has already been paid');
        }

        // Delete auction item
        await prisma.auctionItem.delete({
            where: {
                id: itemId
            }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        throw new Error(`Failed to delete auction item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Export HTTP method handlers
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => getAuctionItemByIdHandler(req, { params }),
        'Get Auction Item by ID'
    ))(req);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => updateAuctionItemHandler(req, { params }),
        'Update Auction Item'
    ))(req);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => deleteAuctionItemHandler(req, { params }),
        'Delete Auction Item'
    ))(req);
}
