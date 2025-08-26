import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/bills/overview
 * Get comprehensive billing overview including unpaid auction items
 */
async function getBillOverviewHandler(req: AuthenticatedRequest): Promise<NextResponse> {
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
            billsStats,
            unpaidItemsStats,
            recentActivity,
            pendingBillsData
        ] = await Promise.all([
            // Bills statistics
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
                _count: {
                    _all: true,
                    payment_status: true
                }
            }),

            // Unpaid auction items (not yet billed)
            prisma.auctionItem.aggregate({
                where: {
                    session: {
                        commissioner_id: userId,
                        created_at: {
                            gte: new Date(startDate),
                            lte: new Date(endDate)
                        }
                    },
                    bill_id: null, // Not yet billed
                    rate: { not: null }, // Only completed sales with rates
                    buyer_id: { not: null } // Only sold items
                },
                _sum: {
                    quantity: true,
                },
                _count: true
            }),

            // Recent activity (last 7 days)
            prisma.bill.findMany({
                where: {
                    commissioner_id: userId,
                    created_at: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                    }
                },
                select: {
                    id: true,
                    bill_number: true,
                    payment_status: true,
                    net_payable: true,
                    created_at: true,
                    farmer: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'desc'
                },
                take: 5
            }),

            // Bills pending for payment
            prisma.bill.findMany({
                where: {
                    commissioner_id: userId,
                    payment_status: 'UNPAID'
                },
                select: {
                    id: true,
                    bill_number: true,
                    net_payable: true,
                    created_at: true,
                    farmer: {
                        select: {
                            name: true,
                            village: true
                        }
                    },
                    product: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'desc'
                },
                take: 10
            })
        ]);

        // Calculate additional stats
        const [paidBills, unpaidBills, unpaidItemsWithValue] = await Promise.all([
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
                    net_payable: true
                },
                _count: true
            }),

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

            // Get unpaid items with estimated value
            prisma.auctionItem.findMany({
                where: {
                    session: {
                        commissioner_id: userId,
                        created_at: {
                            gte: new Date(startDate),
                            lte: new Date(endDate)
                        }
                    },
                    bill_id: null,
                    rate: { not: null },
                    buyer_id: { not: null }
                },
                select: {
                    quantity: true,
                    rate: true,
                    farmer: {
                        select: {
                            name: true
                        }
                    },
                    product: {
                        select: {
                            name: true
                        }
                    },
                    session: {
                        select: {
                            date: true
                        }
                    }
                }
            })
        ]);

        // Calculate estimated value of unpaid items
        const unpaidItemsEstimatedValue = unpaidItemsWithValue.reduce((total, item) => {
            return total + (item.quantity * (item.rate || 0));
        }, 0);

        // Helper function to convert BigInt to Number
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const convertBigIntToNumber = (value: any): number => {
            if (typeof value === 'bigint') {
                return Number(value);
            }
            return Number(value) || 0;
        };

        const totalBillsCount = billsStats._count._all || 0;
        const paidBillsCount = paidBills._count || 0;
        const unpaidBillsCount = unpaidBills._count || 0;
        const unbilledItemsCount = unpaidItemsStats._count || 0;

        const totalBilledAmount = convertBigIntToNumber(billsStats._sum.net_payable);
        const paidAmount = convertBigIntToNumber(paidBills._sum.net_payable);
        const unpaidBilledAmount = convertBigIntToNumber(unpaidBills._sum.net_payable);
        const totalCommission = convertBigIntToNumber(billsStats._sum.commission_amount);

        const paymentRate = totalBillsCount > 0 ? (paidBillsCount / totalBillsCount) * 100 : 0;

        return createSuccessResponse({
            overview: {
                // Bills overview
                total_bills: totalBillsCount,
                paid_bills: paidBillsCount,
                unpaid_bills: unpaidBillsCount,
                
                // Amounts
                total_billed_amount: totalBilledAmount,
                paid_amount: paidAmount,
                unpaid_billed_amount: unpaidBilledAmount,
                total_commission_earned: totalCommission,
                
                // Payment performance
                payment_rate: Math.round(paymentRate * 100) / 100,
                avg_bill_amount: totalBillsCount > 0 ? Math.round(totalBilledAmount / totalBillsCount) : 0,
                
                // Unbilled items
                unbilled_items_count: unbilledItemsCount,
                unbilled_estimated_value: Math.round(unpaidItemsEstimatedValue),
                total_quantity_unbilled: convertBigIntToNumber(unpaidItemsStats._sum?.quantity || 0),
            },
            
            alerts: {
                // Items needing bills
                items_pending_billing: unbilledItemsCount,
                bills_pending_payment: unpaidBillsCount,
                
                // Financial alerts
                potential_revenue_loss: Math.round(unpaidItemsEstimatedValue + unpaidBilledAmount),
                aging_unpaid_bills: pendingBillsData.filter(bill => {
                    const daysSinceCreation = (Date.now() - new Date(bill.created_at).getTime()) / (1000 * 60 * 60 * 24);
                    return daysSinceCreation > 7;
                }).length
            },
            
            recent_activity: recentActivity.map(bill => ({
                id: bill.id,
                bill_number: bill.bill_number,
                farmer_name: bill.farmer.name,
                amount: convertBigIntToNumber(bill.net_payable),
                status: bill.payment_status,
                created_at: bill.created_at,
                days_ago: Math.floor((Date.now() - new Date(bill.created_at).getTime()) / (1000 * 60 * 60 * 24))
            })),
            
            pending_payments: pendingBillsData.map(bill => ({
                id: bill.id,
                bill_number: bill.bill_number,
                farmer_name: bill.farmer.name,
                farmer_village: bill.farmer.village,
                product_name: bill.product.name,
                amount: convertBigIntToNumber(bill.net_payable),
                days_pending: Math.floor((Date.now() - new Date(bill.created_at).getTime()) / (1000 * 60 * 60 * 24)),
                created_at: bill.created_at
            })),
            
            unbilled_items_summary: unpaidItemsWithValue.slice(0, 10).map(item => ({
                farmer_name: item.farmer.name,
                product_name: item.product.name,
                quantity: item.quantity,
                rate: item.rate || 0,
                estimated_value: item.quantity * (item.rate || 0),
                session_date: item.session.date
            }))
        });

    } catch (error) {
        console.error('Error fetching bill overview:', error);
        throw error;
    }
}

const handler = withAuth(withErrorHandling(getBillOverviewHandler));

export { handler as GET };
