import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createPaginatedResponse } from "@/lib/api-response";
import { withErrorHandling, ValidationError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateSchema } from "@/lib/validation";
import { BillFilterSchema } from "@/schemas/bill";

/**
 * GET /api/bills
 * Get bills with filtering, search, and pagination
 */
async function getBillsHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;
    const { searchParams } = new URL(req.url);

    const queryParams = {
        farmer_id: searchParams.get('farmer_id') || undefined,
        farmer_name: searchParams.get('farmer_name') || undefined,
        product_id: searchParams.get('product_id') || undefined,
        session_id: searchParams.get('session_id') || undefined,
        payment_status: (() => {
            const status = searchParams.get('payment_status');
            if (status === 'PAID' || status === 'UNPAID') return status;
            return undefined;
        })(),
        start_date: searchParams.get('start_date') || undefined,
        end_date: searchParams.get('end_date') || undefined,
        page: parseInt(searchParams.get('page') || '1'),
        limit: parseInt(searchParams.get('limit') || '10'),
        sortBy: (() => {
            const sort = searchParams.get('sortBy');
            if (['created_at', 'bill_number', 'net_payable', 'payment_date'].includes(sort || '')) {
                return sort as 'created_at' | 'bill_number' | 'net_payable' | 'payment_date';
            }
            return 'created_at';
        })(),
        sortOrder: (() => {
            const order = searchParams.get('sortOrder');
            if (order === 'asc' || order === 'desc') return order;
            return 'desc';
        })(),
    };

    const validation = validateSchema(BillFilterSchema, queryParams);
    if (!validation.success) {
        throw new ValidationError("Invalid query parameters", validation.errors);
    }

    const filters = validation.data!;
    const skip = (filters.page - 1) * filters.limit;

    // Build where clause
    const whereClause = {
        commissioner_id: userId,
        ...(filters.farmer_id && { farmer_id: filters.farmer_id }),
        ...(filters.farmer_name && { 
            farmer: {
                name: {
                    contains: filters.farmer_name,
                    mode: 'insensitive' as const
                }
            }
        }),
        ...(filters.product_id && { product_id: filters.product_id }),
        ...(filters.session_id && { session_id: filters.session_id }),
        ...(filters.payment_status && { payment_status: filters.payment_status }),
        ...(filters.start_date || filters.end_date) && {
            created_at: {
                ...(filters.start_date && { gte: new Date(filters.start_date) }),
                ...(filters.end_date && { lte: new Date(filters.end_date) })
            }
        }
    };

    // Build order by clause
    const orderBy = {
        [filters.sortBy]: filters.sortOrder
    };

    try {
        const [bills, totalCount] = await Promise.all([
            prisma.bill.findMany({
                where: whereClause,
                select: {
                    id: true,
                    bill_number: true,
                    farmer_id: true,
                    product_id: true,
                    session_id: true,
                    total_quantity: true,
                    gross_amount: true,
                    commission_rate: true,
                    commission_amount: true,
                    net_payable: true,
                    payment_status: true,
                    payment_method: true,
                    payment_date: true,
                    created_at: true,
                    // Only essential farmer data
                    farmer: {
                        select: {
                            name: true,
                            village: true
                        }
                    },
                    // Only essential product data
                    product: {
                        select: {
                            name: true
                        }
                    },
                    // Count auction items instead of loading all
                    _count: {
                        select: {
                            auction_items: true
                        }
                    }
                },
                skip,
                take: filters.limit,
                orderBy
            }),
            prisma.bill.count({
                where: whereClause
            })
        ]);

        return createPaginatedResponse(
            bills,
            filters.page,
            filters.limit,
            totalCount
        );

    } catch (error) {
        console.error('Error fetching bills:', error);
        throw error;
    }
}

const handler = withAuth(withErrorHandling(getBillsHandler));

export { handler as GET };
