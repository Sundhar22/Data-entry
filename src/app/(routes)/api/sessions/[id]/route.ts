import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError, ValidationError, ConflictError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { UpdateSessionSchema } from "@/schemas/session";

/**
 * Calculate comprehensive analytics for a session using database queries
 * Optimized to avoid fetching all auction items
 */
async function calculateSessionAnalytics(sessionId: string) {
    // Get overview analytics
    const overviewStats = await prisma.$queryRaw<Array<{
        total_items: bigint;
        paid_items: bigint;
        unpaid_items: bigint;
    }>>`
        SELECT 
            COUNT(*) as total_items,
            COUNT(bill_id) as paid_items,
            COUNT(*) - COUNT(bill_id) as unpaid_items
        FROM auction_items 
        WHERE session_id = ${sessionId}
    `;

    // Get financial analytics
    const financialStats = await prisma.$queryRaw<Array<{
        total_revenue: number;
        total_commission: number;
        paid_items_count: bigint;
    }>>`
        SELECT 
            COALESCE(SUM(b.gross_amount), 0) as total_revenue,
            COALESCE(SUM(b.commission_amount), 0) as total_commission,
            COUNT(DISTINCT ai.id) as paid_items_count
        FROM auction_items ai
        LEFT JOIN bills b ON ai.bill_id = b.id
        WHERE ai.session_id = ${sessionId} AND ai.bill_id IS NOT NULL
    `;

    // Get unique participants count
    const participantsStats = await prisma.$queryRaw<Array<{
        total_farmers: bigint;
        total_buyers: bigint;
    }>>`
        SELECT 
            COUNT(DISTINCT ai.farmer_id) as total_farmers,
            COUNT(DISTINCT ai.buyer_id) as total_buyers
        FROM auction_items ai
        WHERE ai.session_id = ${sessionId}
    `;

    // Get farmers list
    const farmers = await prisma.$queryRaw<Array<{
        id: string;
        name: string;
        phone: string;
        village: string;
    }>>`
        SELECT DISTINCT f.id, f.name, f.phone, f.village
        FROM farmers f
        INNER JOIN auction_items ai ON f.id = ai.farmer_id
        WHERE ai.session_id = ${sessionId}
        ORDER BY f.name
    `;

    // Get buyers list
    const buyers = await prisma.$queryRaw<Array<{
        id: string;
        name: string;
        phone: string;
    }>>`
        SELECT DISTINCT b.id, b.name, b.phone
        FROM buyers b
        INNER JOIN auction_items ai ON b.id = ai.buyer_id
        WHERE ai.session_id = ${sessionId} AND ai.buyer_id IS NOT NULL
        ORDER BY b.name
    `;

    // Get category breakdown
    const categoryBreakdown = await prisma.$queryRaw<Array<{
        category_name: string;
        total_items: bigint;
        sold_items: bigint;
        total_quantity: number;
        total_value: number;
    }>>`
        SELECT 
            c.name as category_name,
            COUNT(ai.id) as total_items,
            COUNT(ai.bill_id) as sold_items,
            SUM(ai.quantity) as total_quantity,
            COALESCE(SUM(CASE WHEN ai.bill_id IS NOT NULL THEN b.gross_amount ELSE 0 END), 0) as total_value
        FROM auction_items ai
        INNER JOIN products p ON ai.product_id = p.id
        INNER JOIN categories c ON p.category_id = c.id
        LEFT JOIN bills b ON ai.bill_id = b.id
        WHERE ai.session_id = ${sessionId}
        GROUP BY c.id, c.name
        ORDER BY c.name
    `;

    // Transform raw results
    const overview = overviewStats[0] || { total_items: BigInt(0), paid_items: BigInt(0), unpaid_items: BigInt(0) };
    const financial = financialStats[0] || { total_revenue: 0, total_commission: 0, paid_items_count: BigInt(0) };
    const participants = participantsStats[0] || { total_farmers: BigInt(0), total_buyers: BigInt(0) };

    const totalItems = Number(overview.total_items);
    const paidItems = Number(overview.paid_items);
    const totalRevenue = financial.total_revenue;
    const totalCommission = financial.total_commission;
    const paidItemsCount = Number(financial.paid_items_count);

    // Transform category breakdown to match expected format
    const categoryBreakdownObject = categoryBreakdown.reduce((acc, item) => {
        acc[item.category_name] = {
            total_items: Number(item.total_items),
            sold_items: Number(item.sold_items),
            total_quantity: Number(item.total_quantity),
            total_value: Number(item.total_value)
        };
        return acc;
    }, {} as Record<string, {
        total_items: number;
        sold_items: number;
        total_quantity: number;
        total_value: number;
    }>);

    return {
        overview: {
            total_items: totalItems,
            paid_farmer: paidItems,
            unpaid_farmer: Number(overview.unpaid_items),
            completion_rate: totalItems > 0 ? Math.round((paidItems / totalItems) * 100) : 0
        },
        financial: {
            total_revenue: totalRevenue,
            total_commission: totalCommission,
            farmer_earnings: totalRevenue - totalCommission,
            average_item_value: paidItemsCount > 0 ? totalRevenue / paidItemsCount : 0
        },
        participants: {
            total_farmers: Number(participants.total_farmers),
            total_buyers: Number(participants.total_buyers),
            farmers: farmers,
            buyers: buyers
        },
        products: {
            category_breakdown: categoryBreakdownObject,
            total_categories: Object.keys(categoryBreakdownObject).length
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

    // Get session with basic information only - no auction items for performance
    const session = await prisma.auctionSession.findFirst({
        where: {
            id: sessionId,
            commissioner_id: userId
        },
        select: {
            id: true,
            date: true,
            status: true,
            payment_status: true,
            created_at: true,
            updated_at: true,
            commissioner_id: true
        }
    });

    if (!session) {
        throw new NotFoundError('Session not found');
    }

    // Calculate analytics using separated function
    const sessionAnalytics = await calculateSessionAnalytics(sessionId);

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
        // Cannot set status to ACTIVE if session date is in the past (before today at 00:00 AM)
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (validatedData.status === 'ACTIVE' && existingSession.date < startOfToday) {
            throw new ValidationError('Cannot activate session with past date');
        }
        
        // COMPLETED status is just for triggering messaging service
        // No other business rules needed - it's independent of bills/payments
    }

    // Date validation - cannot set date to past for active sessions
    if (validatedData.date && existingSession.status === 'ACTIVE') {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (validatedData.date < startOfToday) {
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
