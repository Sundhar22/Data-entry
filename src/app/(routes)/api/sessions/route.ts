import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createSuccessResponse, createPaginatedResponse } from "@/lib/api-response";
import { withErrorHandling } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/types/auth";
import { CreateSessionData, CreateSessionSchema, SessionFilterSchema, SessionFilters } from "@/schemas/session";
import { validateRequest } from "@/lib/validation";

/**
 * GET /api/sessions
 * List auction sessions with filtering, pagination, and search
 */
async function getSessionsHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;
    const { searchParams } = new URL(req.url);

    // Parse and validate query parameters
    const filterParams: Partial<SessionFilters> = {
        status: searchParams.get('status') as 'ACTIVE' | 'COMPLETED' | undefined || undefined,
        startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
        endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
        page: parseInt(searchParams.get('page') || '1'),
        limit: parseInt(searchParams.get('limit') || '10'),
        sortBy: (searchParams.get('sortBy') as 'date' | 'created_at' | 'updated_at') || 'date',
        sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    };

    const validation = SessionFilterSchema.safeParse(filterParams);
    if (!validation.success) {
        return NextResponse.json({
            success: false,
            message: "Invalid filter parameters",
            errors: validation.error.issues
        }, { status: 400 });
    }

    const filters = validation.data;
    const skip = (filters.page - 1) * filters.limit;

    // Build where clause
    const whereClause = {
        commissioner_id: userId,
        ...(filters.status && { status: filters.status }),
        ...(filters.startDate || filters.endDate) && {
            date: {
                ...(filters.startDate && { gte: filters.startDate }),
                ...(filters.endDate && { lte: filters.endDate }),
            }
        }
    };

    // Build order by clause
    const orderBy = {
        [filters.sortBy]: filters.sortOrder
    };

    try {
        // Get sessions with counts and aggregated data
        const [sessions, totalCount] = await Promise.all([
            prisma.auctionSession.findMany({
                where: whereClause,
                select: {
                    id: true,
                    date: true,
                    status: true,
                    payment_status: true,
                    created_at: true,
                    updated_at: true,
                    // Include aggregated auction items data
                    auction_items: {
                        select: {
                            id: true,
                            quantity: true,
                            rate: true,
                            bill_id: true
                        }
                    },
                    // Include commissioner info
                    commissioner: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                skip,
                take: filters.limit,
                orderBy
            }),
            prisma.auctionSession.count({ where: whereClause })
        ]);

        // Transform sessions to include summary data
        const transformedSessions = sessions.map(session => {
            const totalItems = session.auction_items.length;
            const totalValue = session.auction_items.reduce((sum, item) => sum + (item.rate || 0), 0);
            const paidItems = session.auction_items.filter(item => item.bill_id !== null).length;
            const pendingItems = totalItems - paidItems;

            return {
                id: session.id,
                date: session.date,
                status: session.status,
                payment_status: session.payment_status,
                created_at: session.created_at,
                updated_at: session.updated_at,
                commissioner: session.commissioner,
                summary: {
                    total_items: totalItems,
                    total_value: totalValue,
                    paid_items: paidItems,
                    pending_items: pendingItems,
                    completion_percentage: totalItems > 0 ? Math.round((paidItems / totalItems) * 100) : 0
                }
            };
        });

        return createPaginatedResponse(transformedSessions, filters.page, filters.limit, totalCount);
    } catch (error) {
        throw new Error(`Failed to fetch sessions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * POST /api/sessions
 * Create a new auction session
 */
async function createSessionHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;

    // Validate request body
    const validator = validateRequest(CreateSessionSchema);
    const validation = await validator(req);

    if (!validation.success) {
        return validation.response;
    }

    const validatedData: CreateSessionData = validation.data;

    try {
        // Check if there's already an active session for today for this commissioner
        const existingActiveSession = await prisma.auctionSession.findFirst({
            where: {
                commissioner_id: userId,
                status: 'ACTIVE',
                date: {
                    gte: new Date(validatedData.date.toDateString()), // Start of day
                    lt: new Date(new Date(validatedData.date.toDateString()).getTime() + 24 * 60 * 60 * 1000) // End of day
                }
            }
        });

        if (existingActiveSession) {
            return NextResponse.json({
                success: false,
                message: "An active session already exists for this date",
                data: { existingSessionId: existingActiveSession.id }
            }, { status: 409 });
        }

        // Create new session
        const session = await prisma.auctionSession.create({
            data: {
                date: validatedData.date,
                commissioner_id: userId,
                status: 'ACTIVE',
                payment_status: 'PENDING'
            },
            select: {
                id: true,
                date: true,
                status: true,
                payment_status: true,
                created_at: true,
                updated_at: true,
                commissioner: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return createSuccessResponse(session, 201);
    } catch (error) {
        throw new Error(`Failed to create session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export const GET = withAuth(withErrorHandling(getSessionsHandler, 'Get Sessions'));
export const POST = withAuth(withErrorHandling(createSessionHandler, 'Create Session'));
