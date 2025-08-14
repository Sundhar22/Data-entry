import prisma from "@/lib/prisma";
import { ConflictError, NotFoundError } from "@/lib/error-handler";

export interface SessionValidationResult {
  session: {
    id: string;
    status: 'ACTIVE' | 'COMPLETED';
    payment_status: 'PENDING' | 'COMPLETED';
    date: Date;
  };
  canModify: boolean;
  canDelete: boolean;
  restrictions: string[];
}

/**
 * Comprehensive session validation for auction item operations
 */
export async function validateSessionForOperation(
  sessionId: string,
  commissionerId: string,
  operation: 'CREATE' | 'UPDATE' | 'DELETE'
): Promise<SessionValidationResult> {
  // Get session with related data
  const session = await prisma.auctionSession.findFirst({
    where: {
      id: sessionId,
      commissioner_id: commissionerId
    },
    select: {
      id: true,
      status: true,
      payment_status: true,
      date: true,
      _count: {
        select: {
          auction_items: true
        }
      }
    }
  });

  if (!session) {
    throw new NotFoundError('Session not found or access denied');
  }

  const restrictions: string[] = [];
  let canModify = false;
  let canDelete = false;

  // Session status validation
  if (session.status === 'COMPLETED') {
    restrictions.push('Session is COMPLETED - no modifications allowed');
  } else if (session.status === 'ACTIVE') {
    canModify = true;
  }

  // Payment status validation
  if (session.payment_status === 'COMPLETED') {
    restrictions.push('Session payments are COMPLETED - modifications restricted');
    canModify = false;
  }

  // Date validation for ACTIVE sessions
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (session.status === 'ACTIVE' && session.date < startOfToday) {
    restrictions.push('Cannot modify past date ACTIVE sessions');
    canModify = false;
  }

  // Delete validation
  if (session.payment_status === 'COMPLETED') {
    canDelete = true; // Can delete completed sessions
  } else if (session.payment_status === 'PENDING' && session._count.auction_items === 0) {
    canDelete = true; // Can delete empty pending sessions
  } else {
    restrictions.push(`Cannot delete PENDING session with ${session._count.auction_items} items`);
  }

  // Operation-specific validation
  switch (operation) {
    case 'CREATE':
    case 'UPDATE':
      if (!canModify) {
        throw new ConflictError(`Cannot ${operation.toLowerCase()} auction items: ${restrictions.join(', ')}`);
      }
      break;
    case 'DELETE':
      if (!canDelete && !canModify) {
        throw new ConflictError(`Cannot delete auction items: ${restrictions.join(', ')}`);
      }
      break;
  }

  return {
    session: {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      date: session.date
    },
    canModify,
    canDelete,
    restrictions
  };
}

/**
 * Validate auction item for modification based on payment status
 */
export async function validateAuctionItemForOperation(
  itemId: string,
  sessionId: string,
  operation: 'UPDATE' | 'DELETE'
): Promise<{ canModify: boolean; restrictions: string[] }> {
  const item = await prisma.auctionItem.findFirst({
    where: {
      id: itemId,
      session_id: sessionId
    },
    select: {
      id: true,
      bill_id: true,
      bill: {
        select: {
          id: true,
          bill_number: true,
          payment_date: true
        }
      }
    }
  });

  if (!item) {
    throw new NotFoundError('Auction item not found');
  }

  const restrictions: string[] = [];
  let canModify = true;

  // Check if item is already paid
  if (item.bill_id && item.bill) {
    restrictions.push(`Item is already paid (Bill: ${item.bill.bill_number})`);
    canModify = false;
  }

  if (!canModify) {
    throw new ConflictError(`Cannot ${operation.toLowerCase()} auction item: ${restrictions.join(', ')}`);
  }

  return { canModify, restrictions };
}

/**
 * Get session overview with validation status
 */
export async function getSessionOverview(sessionId: string, commissionerId: string) {
  const session = await prisma.auctionSession.findFirst({
    where: {
      id: sessionId,
      commissioner_id: commissionerId
    },
    include: {
      auction_items: {
        select: {
          id: true,
          bill_id: true,
          rate: true,
          quantity: true
        }
      },
      _count: {
        select: {
          auction_items: true
        }
      }
    }
  });

  if (!session) {
    throw new NotFoundError('Session not found');
  }

  const paidItems = session.auction_items.filter(item => item.bill_id !== null);
  const unpaidItems = session.auction_items.filter(item => item.bill_id === null);
  const incompleteItems = session.auction_items.filter(item => !item.rate || !item.bill_id);

  return {
    ...session,
    summary: {
      total_items: session.auction_items.length,
      paid_items: paidItems.length,
      unpaid_items: unpaidItems.length,
      incomplete_items: incompleteItems.length,
      completion_rate: session.auction_items.length > 0 
        ? Math.round((paidItems.length / session.auction_items.length) * 100) 
        : 0,
      can_modify: session.status === 'ACTIVE' && session.payment_status !== 'COMPLETED',
      can_complete: unpaidItems.length === 0 && incompleteItems.length === 0,
      restrictions: session.status === 'COMPLETED' 
        ? ['Session is completed'] 
        : session.payment_status === 'COMPLETED' 
          ? ['Payments are completed'] 
          : []
    }
  };
}
