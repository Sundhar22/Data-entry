import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError, ConflictError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { CompleteAuctionItemSchema } from "@/schemas/auction-item";

/**
 * POST /api/sessions/[id]/items/[itemId]/complete
 * Complete a partial auction item by adding buyer and rate
 */
async function completeAuctionItemHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId, itemId } = await params;

    // Validate request body
    const validator = validateRequest(CompleteAuctionItemSchema);
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
            throw new ConflictError('Cannot complete items in non-active session');
        }

        // Check if auction item exists and is partial (no buyer or rate)
        const existingItem = await prisma.auctionItem.findFirst({
            where: {
                id: itemId,
                session_id: sessionId
            },
            select: {
                id: true,
                buyer_id: true,
                rate: true,
                bill_id: true
            }
        });

        if (!existingItem) {
            throw new NotFoundError('Auction item not found');
        }

        if (existingItem.bill_id) {
            throw new ConflictError('Cannot complete auction item that has already been paid');
        }

        // Verify buyer belongs to commissioner
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

        // Complete the auction item
        const completedItem = await prisma.auctionItem.update({
            where: {
                id: itemId
            },
            data: {
                buyer_id: validatedData.buyer_id,
                rate: validatedData.rate
            },
            include: {
                farmer: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                        village: true
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
                        phone: true
                    }
                }
            }
        });

        return createSuccessResponse(completedItem);
    } catch (error) {
        throw new Error(`Failed to complete auction item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Export HTTP method handler
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => completeAuctionItemHandler(req, { params }),
        'Complete Auction Item'
    ))(req);
}
