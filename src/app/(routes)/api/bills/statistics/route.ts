import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/bills/statistics
 * Get bill statistics and insights
 */
async function getBillStatisticsHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;
    const { searchParams } = new URL(req.url);
    
    // Date filters with validation
    const startDateParam = searchParams.get('start_date');
    const endDateParam = searchParams.get('end_date');
    
    // Validate and parse dates
    let startDate: string;
    let endDate: string;
    
    if (startDateParam && !isNaN(Date.parse(startDateParam))) {
        startDate = new Date(startDateParam).toISOString();
    } else {
        // Default to first day of current month
        startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    }
    
    if (endDateParam && !isNaN(Date.parse(endDateParam))) {
        endDate = new Date(endDateParam).toISOString();
    } else {
        // Default to current date
        endDate = new Date().toISOString();
    }

    try {
        const [
            totalBills,
            paidBills,
            unpaidBills,
            topFarmers,
            topProducts,
            paymentMethodStats
        ] = await Promise.all([
            // Total bills count and amount
            prisma.bill.aggregate({
                where: {
                    commissioner_id: userId,
                    created_at: {
                        gte: new Date(startDate),
                        lte: new Date(endDate)
                    }
                },
                _sum: {
                    net_payable: true,
                    gross_amount: true,
                    commission_amount: true
                },
                _count: true
            }),

            // Paid bills stats
            prisma.bill.aggregate({
                where: {
                    commissioner_id: userId,
                    payment_status: 'PAID',
                    created_at: {
                        gte: new Date(startDate),
                        lte: new Date(endDate)
                    }
                },
                _sum: {
                    net_payable: true,
                    commission_amount: true
                },
                _count: true
            }),

            // Unpaid bills stats
            prisma.bill.aggregate({
                where: {
                    commissioner_id: userId,
                    payment_status: 'UNPAID',
                    created_at: {
                        gte: new Date(startDate),
                        lte: new Date(endDate)
                    }
                },
                _sum: {
                    net_payable: true
                },
                _count: true
            }),

            // Top farmers by bill amount (limited to top 5)
            prisma.$queryRaw`
                SELECT 
                    f.name,
                    f.village,
                    COUNT(b.id) as bills_count,
                    SUM(b.net_payable) as total_amount
                FROM bills b
                JOIN farmers f ON b.farmer_id = f.id
                WHERE b.commissioner_id = ${userId}
                    AND b.created_at >= ${startDate}::timestamp
                    AND b.created_at <= ${endDate}::timestamp
                GROUP BY f.id, f.name, f.village
                ORDER BY total_amount DESC
                LIMIT 5
            `,

            // Top products by bill amount (limited to top 5)
            prisma.$queryRaw`
                SELECT 
                    p.name,
                    COUNT(b.id) as bills_count,
                    SUM(b.net_payable) as total_amount,
                    SUM(b.total_quantity) as total_quantity
                FROM bills b
                JOIN products p ON b.product_id = p.id
                WHERE b.commissioner_id = ${userId}
                    AND b.created_at >= ${startDate}::timestamp
                    AND b.created_at <= ${endDate}::timestamp
                GROUP BY p.id, p.name
                ORDER BY total_amount DESC
                LIMIT 5
            `,

            // Payment method statistics
            prisma.$queryRaw`
                SELECT 
                    COALESCE(payment_method, 'Unpaid') as method,
                    COUNT(*) as bills_count,
                    SUM(net_payable) as total_amount
                FROM bills
                WHERE commissioner_id = ${userId}
                    AND created_at >= ${startDate}::timestamp
                    AND created_at <= ${endDate}::timestamp
                GROUP BY payment_method
                ORDER BY total_amount DESC
            `
        ]);

        // Helper function to convert BigInt to Number
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const convertBigIntToNumber = (value: any): number => {
            if (typeof value === 'bigint') {
                return Number(value);
            }
            return Number(value) || 0;
        };

        // Helper function to process query results and convert BigInt values
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processQueryResults = (results: any[]): Record<string, any>[] => {
            return results.map(row => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const processedRow: Record<string, any> = {};
                for (const [key, value] of Object.entries(row)) {
                    processedRow[key] = typeof value === 'bigint' ? Number(value) : value;
                }
                return processedRow;
            });
        };

        // Process raw query results to convert BigInt to Number
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedTopFarmers = processQueryResults(topFarmers as any[]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedTopProducts = processQueryResults(topProducts as any[]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedPaymentMethodStats = processQueryResults(paymentMethodStats as any[]);

        // Calculate averages and percentages
        const totalBillsCount = totalBills._count || 0;
        const paidBillsCount = paidBills._count || 0;
        const unpaidBillsCount = unpaidBills._count || 0;

        const totalAmount = convertBigIntToNumber(totalBills._sum.net_payable);
        const paidAmount = convertBigIntToNumber(paidBills._sum.net_payable);
        const unpaidAmount = convertBigIntToNumber(unpaidBills._sum.net_payable);

        const avgBillAmount = totalBillsCount > 0 ? totalAmount / totalBillsCount : 0;
        const paymentRate = totalBillsCount > 0 ? (paidBillsCount / totalBillsCount) * 100 : 0;

        return createSuccessResponse({
            overview: {
                total_bills: totalBillsCount,
                paid_bills: paidBillsCount,
                unpaid_bills: unpaidBillsCount,
                total_amount: totalAmount,
                paid_amount: paidAmount,
                unpaid_amount: unpaidAmount,
                commission_amount: convertBigIntToNumber(totalBills._sum.commission_amount),
                gross_amount: convertBigIntToNumber(totalBills._sum.gross_amount),
                avg_bill_amount: Math.round(avgBillAmount),
                payment_rate: Math.round(paymentRate * 100) / 100
            },
            top_farmers: processedTopFarmers.slice(0, 3), // Only top 3
            top_products: processedTopProducts.slice(0, 3), // Only top 3
            payment_methods: processedPaymentMethodStats
        });

    } catch (error) {
        console.error('Error fetching bill statistics:', error);
        throw error;
    }
}

const handler = withAuth(withErrorHandling(getBillStatisticsHandler));

export { handler as GET };
