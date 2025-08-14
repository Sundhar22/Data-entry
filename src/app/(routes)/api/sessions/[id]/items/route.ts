import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse, createPaginatedResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { CreateAuctionItemSchema, AuctionItemFilterSchema } from "@/schemas/auction-item";
import { validateSessionForOperation } from "@/lib/session-validation";

/**
 * GET /api/sessions/[id]/items
 * Get all auction items in a specific session with filtering and pagination
 */
async function getSessionItemsHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId } = await params;
    const { searchParams } = new URL(req.url);

    // Parse and validate query parameters
    const filterParams = {
        farmer_id: searchParams.get('farmer_id') || undefined,
        product_id: searchParams.get('product_id') || undefined,
        buyer_id: searchParams.get('buyer_id') || undefined,
        paid: searchParams.get('paid') || undefined,
        completed: searchParams.get('completed') || undefined,
        page: parseInt(searchParams.get('page') || '1'),
        limit: parseInt(searchParams.get('limit') || '10'),
        sortBy: (searchParams.get('sortBy') as 'created_at' | 'rate' | 'quantity') || 'created_at',
        sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    };

    const validation = AuctionItemFilterSchema.safeParse(filterParams);
    if (!validation.success) {
        return NextResponse.json({
            success: false,
            message: "Invalid filter parameters",
            errors: validation.error.issues
        }, { status: 400 });
    }

    const filters = validation.data;

    // First, verify session exists and belongs to commissioner
    const session = await prisma.auctionSession.findFirst({
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

    if (!session) {
        throw new NotFoundError('Session not found');
    }

    const skip = (filters.page - 1) * filters.limit;

    // Build where clause for auction items
    const whereClause = {
        session_id: sessionId,
        ...(filters.farmer_id && { farmer_id: filters.farmer_id }),
        ...(filters.product_id && { product_id: filters.product_id }),
        ...(filters.buyer_id && { buyer_id: filters.buyer_id }),
        ...(filters.paid && {
            bill_id: filters.paid === 'true' ? { not: null } : null
        }),
        ...(filters.completed && {
            AND: filters.completed === 'true' 
                ? [{ buyer_id: { not: null } }, { rate: { not: null } }]
                : [{ OR: [{ buyer_id: null }, { rate: null }] }]
        })
    };

    // Build order by clause
    const orderBy = {
        [filters.sortBy]: filters.sortOrder
    };

    try {
        const [items, totalCount] = await Promise.all([
            prisma.auctionItem.findMany({
                where: whereClause,
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
                    },
                    bill: {
                        select: {
                            id: true,
                            bill_number: true,
                            payment_date: true,
                            gross_amount: true,
                            commission_amount: true,
                            net_payable: true
                        }
                    }
                },
                skip,
                take: filters.limit,
                orderBy
            }),
            prisma.auctionItem.count({ where: whereClause })
        ]);

        return createPaginatedResponse(items, filters.page, filters.limit, totalCount);
    } catch (error) {
        throw new Error(`Failed to fetch auction items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * POST /api/sessions/[id]/items
 * Add a new auction item to a session
 */
async function createSessionItemHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: sessionId } = await params;

    // Validate request body
    const validator = validateRequest(CreateAuctionItemSchema);
    const validation = await validator(req);

    if (!validation.success) {
        return validation.response;
    }

    const validatedData = validation.data;

    try {
        // Comprehensive session validation
        await validateSessionForOperation(sessionId, userId, 'CREATE');

        // Verify farmer belongs to commissioner
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

        // Verify buyer belongs to commissioner (if buyer_id is provided)
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

        // Verify product exists and is active
        const product = await prisma.product.findFirst({
            where: {
                id: validatedData.product_id,
                is_active: true
            }
        });

        if (!product) {
            throw new NotFoundError('Product not found or not active');
        }

        // Create auction item
        const auctionItem = await prisma.auctionItem.create({
            data: {
                session_id: sessionId,
                farmer_id: validatedData.farmer_id,
                product_id: validatedData.product_id,
                unit: validatedData.unit,
                quantity: validatedData.quantity,
                ...(validatedData.buyer_id && { buyer_id: validatedData.buyer_id }),
                ...(validatedData.rate && { rate: validatedData.rate })
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

        return createSuccessResponse(auctionItem, 201);
    } catch (error) {
        throw new Error(`Failed to create auction item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Export HTTP method handlers
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => getSessionItemsHandler(req, { params }),
        'Get Session Items'
    ))(req);
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => createSessionItemHandler(req, { params }),
        'Create Session Item'
    ))(req);
}
