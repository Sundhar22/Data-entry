import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError, ValidationError, ConflictError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { UpdateSessionSchema } from "@/schemas/session";

// Analytics types
interface SessionWithItems {
    auction_items: Array<{
        id: string;
        quantity: number;
        bill: {
            gross_amount: number;
            commission_amount: number;
        } | null;
        farmer: {
            id: string;
            name: string;
            village: string;
        };
        product: {
            category: {
                name: string;
            };
        };
        buyer?: {
            id: string;
            name: string;
        };
    }>;
}

/**
 * Calculate comprehensive analytics for a session
 * Separated for future use and modularity
 */
function calculateSessionAnalytics(session: SessionWithItems) {
    // Calculate detailed session analytics
    const soldItems = session.auction_items.filter(item => item.bill !== null);
    const unsoldItems = session.auction_items.filter(item => item.bill === null);

    const totalRevenue = soldItems.reduce((sum: number, item) => {
        return sum + (item.bill ? item.bill.gross_amount : 0);
    }, 0);

    const totalCommission = soldItems.reduce((sum: number, item) => {
        return sum + (item.bill ? item.bill.commission_amount : 0);
    }, 0);

    // Get unique farmers and buyers
    const uniqueFarmers = Array.from(
        new Map(session.auction_items.map(item => [item.farmer.id, item.farmer])).values()
    );

    const uniqueBuyers = Array.from(
        new Map(
            soldItems
                .filter(item => item.buyer)
                .map(item => [item.buyer!.id, item.buyer])
        ).values()
    );

    // Get product categories breakdown
    const categoryBreakdown = session.auction_items.reduce((acc: Record<string, {
        total_items: number;
        sold_items: number;
        total_quantity: number;
        total_value: number;
    }>, item) => {
        const categoryName = item.product.category.name;
        if (!acc[categoryName]) {
            acc[categoryName] = {
                total_items: 0,
                sold_items: 0,
                total_quantity: 0,
                total_value: 0
            };
        }
        acc[categoryName].total_items += 1;
        acc[categoryName].total_quantity += item.quantity;
        if (item.bill) {
            acc[categoryName].sold_items += 1;
            acc[categoryName].total_value += item.bill.gross_amount;
        }
        return acc;
    }, {});

    return {
        overview: {
            total_items: session.auction_items.length,
            sold_items: soldItems.length,
            unsold_items: unsoldItems.length,
            completion_rate: session.auction_items.length > 0 
                ? Math.round((soldItems.length / session.auction_items.length) * 100) 
                : 0
        },
        financial: {
            total_revenue: totalRevenue,
            total_commission: totalCommission,
            farmer_earnings: totalRevenue - totalCommission,
            average_item_value: soldItems.length > 0 ? totalRevenue / soldItems.length : 0
        },
        participants: {
            total_farmers: uniqueFarmers.length,
            total_buyers: uniqueBuyers.length,
            farmers: uniqueFarmers,
            buyers: uniqueBuyers
        },
        products: {
            category_breakdown: categoryBreakdown,
            total_categories: Object.keys(categoryBreakdown).length
        }
    };
}
/**
 * GET /api/sessions/[id]
 * Get detailed session information including auction items and analytics
 */
async function getSessionByIdHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId } = await params;

    // Get session with all related data
    const session = await prisma.auctionSession.findFirst({
        where: {
            id: sessionId,
            commissioner_id: userId
        },
        include: {
            auction_items: {
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    },
                    farmer: {
                        select: {
                            id: true,
                            name: true,
                            phone: true,
                            village: true
                        }
                    },
                    
                    buyer: {
                        select: {
                            id: true,
                            name: true,
                            phone: true
                        }
                    },
                    bill: true
                }
            },
            commissioner: {
                select: {
                    id: true,
                    name: true,
                    phone: true
                }
            }
            

        }
    });

    if (!session) {
        throw new NotFoundError('Session not found');
    }

    // Calculate analytics using separated function
    const sessionAnalytics = calculateSessionAnalytics(session);

    const response = {
        session: {
            ...session,
            analytics: sessionAnalytics
        }
    };

    return createSuccessResponse(response);
}

/**
 * PUT /api/sessions/[id]
 * Update session status and properties with business rule validation
 */
async function updateSessionByIdHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId } = await params;

    // Validate request body
    const validator = validateRequest(UpdateSessionSchema);
    const validation = await validator(req);

    if (!validation.success) {
        return validation.response;
    }

    const validatedData = validation.data;

    // Check if session exists and belongs to commissioner (optimized - only get what we need)
    const existingSession = await prisma.auctionSession.findFirst({
        where: {
            id: sessionId,
            commissioner_id: userId
        },
        select: {
            id: true,
            status: true,
            date: true
        }
    });

    if (!existingSession) {
        throw new NotFoundError('Session not found');
    }

    // Business rule validations for status changes
    if (validatedData.status && validatedData.status !== existingSession.status && existingSession.status === 'COMPLETED') {
        // Cannot set status to ACTIVE if session date is in the past
        if (validatedData.status === 'ACTIVE' && existingSession.date < new Date()) {
            throw new ValidationError('Cannot activate session with past date');
        }
        
        // COMPLETED status is just for triggering messaging service
        // No other business rules needed - it's independent of bills/payments
    }

    // Date validation - cannot set date to past for active sessions
    if (validatedData.date && existingSession.status === 'ACTIVE') {
        if (validatedData.date < new Date()) {
            throw new ValidationError('Cannot set past date for active session');
        }
    }

    // Update session
    const updatedSession = await prisma.auctionSession.update({
        where: { 
            id: sessionId,
            commissioner_id: userId 
        },
        data: {
            status: validatedData.status || existingSession.status,
            date: validatedData.date || existingSession.date
        },
        include: {
            auction_items: {
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    },
                    farmer: {
                        select: {
                            id: true,
                            name: true,
                            village: true
                        }
                    }
                }
            },
            commissioner: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    return createSuccessResponse(updatedSession);
}

/**
 * DELETE /api/sessions/[id]
 * Delete a session with business rule validation
 */
async function deleteSessionByIdHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId } = await params;

    // Check if session exists and belongs to commissioner (optimized - only get what we need)
    const existingSession = await prisma.auctionSession.findFirst({
        where: {
            id: sessionId,
            commissioner_id: userId
        },
        select: {
            id: true,
            payment_status: true,
            _count: {
                select: {
                    auction_items: true
                }
            }
        }
    });

    if (!existingSession) {
        throw new NotFoundError('Session not found');
    }

    // Business rules for deletion:
    // 1. Can delete sessions with COMPLETED payment status (regardless of auction items)
    // 2. Can delete sessions with PENDING payment status only if they have no auction items
    // 3. Cannot delete sessions with PARTIAL payment status
    const hasAuctionItems = existingSession._count.auction_items > 0;
    
    if (existingSession.payment_status === 'COMPLETED') {
        // COMPLETED sessions can always be deleted
    } else if (existingSession.payment_status === 'PENDING' && !hasAuctionItems) {
        // PENDING sessions can be deleted only if empty (no auction items)
    } else if (existingSession.payment_status === 'PENDING' && hasAuctionItems) {
        throw new ConflictError(`Cannot delete PENDING session with ${hasAuctionItems} auction items. Remove items first or complete payments.`);
    } else {
        throw new ConflictError(`Cannot delete session with payment status: ${existingSession.payment_status}. Only COMPLETED sessions or empty PENDING sessions can be deleted.`);
    }

    // Delete session (this will cascade delete auction items due to foreign key constraints)
    await prisma.auctionSession.delete({
        where: {
            id: sessionId,
            commissioner_id: userId
        }
    });

    return new NextResponse(null, { status: 204 });
}

// Export HTTP method handlers
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => getSessionByIdHandler(req, { params }),
        'Get Session by ID'
    ))(req);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => updateSessionByIdHandler(req, { params }),
        'Update Session by ID'
    ))(req);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => deleteSessionByIdHandler(req, { params }),
        'Delete Session by ID'
    ))(req);
}
