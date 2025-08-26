import prisma from "@/lib/prisma";
import { ConflictError, NotFoundError } from "@/lib/error-handler";

export interface SessionValidationResult {
  session: {
    id: string;
    status: "ACTIVE" | "COMPLETED";
    payment_status: "PENDING" | "COMPLETED";
    date: Date;
  };
  canModify: boolean;
  canDelete: boolean;
  restrictions: string[];
}

/**
 * Comprehensive session validation for auction item operations
 * Note: Only one session per day is allowed per commissioner (ACTIVE or COMPLETED)
 */
export async function validateSessionForOperation(
  sessionId: string,
  commissionerId: string,
  operation: "CREATE" | "UPDATE" | "DELETE",
): Promise<SessionValidationResult> {
  // Get session with related data
  const session = await prisma.auctionSession.findFirst({
    where: {
      id: sessionId,
      commissioner_id: commissionerId,
    },
    select: {
      id: true,
      status: true,
      payment_status: true,
      date: true,
      _count: {
        select: {
          auction_items: true,
        },
      },
    },
  });

  if (!session) {
    throw new NotFoundError("Session not found or access denied");
  }

  const restrictions: string[] = [];
  let canModify = false;
  let canDelete = false;

  // Session status validation
  if (session.status === "COMPLETED") {
    restrictions.push("Session is COMPLETED - no modifications allowed");
  } else if (session.status === "ACTIVE") {
    canModify = true;
  }

  // Payment status validation - allow modifications for current day even if payments completed
  const today = new Date();
  const sessionDate = new Date(session.date);
  const isToday = sessionDate.toDateString() === today.toDateString();

  if (session.payment_status === "COMPLETED" && !isToday) {
    restrictions.push(
      "Session payments are COMPLETED and session date is not today - modifications restricted",
    );
    canModify = false;
  }
  // If it's today's session, allow modifications even if payments are completed

  // Date validation for ACTIVE sessions (only restrict if not today)
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  if (session.status === "ACTIVE" && session.date < startOfToday) {
    restrictions.push("Cannot modify past date ACTIVE sessions");
    canModify = false;
  }

  // Delete validation
  if (session.payment_status === "COMPLETED") {
    canDelete = true; // Can delete completed sessions
  } else if (
    session.payment_status === "PENDING" &&
    session._count.auction_items === 0
  ) {
    canDelete = true; // Can delete empty pending sessions
  } else {
    restrictions.push(
      `Cannot delete PENDING session with ${session._count.auction_items} items`,
    );
  }

  // Operation-specific validation
  switch (operation) {
    case "CREATE":
    case "UPDATE":
      if (!canModify) {
        throw new ConflictError(
          `Cannot ${operation.toLowerCase()} auction items: ${restrictions.join(", ")}`,
        );
      }
      break;
    case "DELETE":
      if (!canDelete && !canModify) {
        throw new ConflictError(
          `Cannot delete auction items: ${restrictions.join(", ")}`,
        );
      }
      break;
  }

  return {
    session: {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      date: session.date,
    },
    canModify,
    canDelete,
    restrictions,
  };
}

/**
 * Validate auction item for modification based on payment status
 * Items can be modified/deleted if they are not paid (no bill_id), regardless of session payment status
 */
export async function validateAuctionItemForOperation(
  itemId: string,
  sessionId: string,
  operation: "UPDATE" | "DELETE",
): Promise<{ canModify: boolean; restrictions: string[] }> {
  const item = await prisma.auctionItem.findFirst({
    where: {
      id: itemId,
      session_id: sessionId,
    },
    select: {
      id: true,
      bill_id: true,
      bill: {
        select: {
          id: true,
          bill_number: true,
          payment_date: true,
        },
      },
    },
  });

  if (!item) {
    throw new NotFoundError("Auction item not found");
  }

  const restrictions: string[] = [];
  let canModify = true;

  // Check if item is already paid (has a bill)
  // Only restrict modification/deletion of items that have been paid
  if (item.bill_id && item.bill) {
    restrictions.push(
      `Item is already paid (Bill: ${item.bill.bill_number}) - cannot be modified or deleted`,
    );
    canModify = false;

    throw new ConflictError(
      `Cannot ${operation.toLowerCase()} auction item: ${restrictions.join(", ")}`,
    );
  }

  // If item is not paid (no bill_id), allow modification regardless of session payment status
  return { canModify, restrictions };
}

/**
 * Get session overview with validation status
 */
export async function getSessionOverview(
  sessionId: string,
  commissionerId: string,
) {
  const session = await prisma.auctionSession.findFirst({
    where: {
      id: sessionId,
      commissioner_id: commissionerId,
    },
    include: {
      auction_items: {
        select: {
          id: true,
          bill_id: true,
          rate: true,
          quantity: true,
        },
      },
      _count: {
        select: {
          auction_items: true,
        },
      },
    },
  });

  if (!session) {
    throw new NotFoundError("Session not found");
  }

  const paidItems = session.auction_items.filter(
    (item) => item.bill_id !== null,
  );
  const unpaidItems = session.auction_items.filter(
    (item) => item.bill_id === null,
  );
  const incompleteItems = session.auction_items.filter(
    (item) => !item.rate || !item.bill_id,
  );

  // Check if modifications are allowed
  const today = new Date();
  const sessionDate = new Date(session.date);
  const isToday = sessionDate.toDateString() === today.toDateString();

  const canModify =
    session.status === "ACTIVE" &&
    (session.payment_status !== "COMPLETED" || isToday);

  const restrictions: string[] = [];
  if (session.status === "COMPLETED") {
    restrictions.push("Session is completed");
  } else if (session.payment_status === "COMPLETED" && !isToday) {
    restrictions.push("Payments are completed and session is not for today");
  }

  return {
    ...session,
    summary: {
      total_items: session.auction_items.length,
      paid_items: paidItems.length,
      unpaid_items: unpaidItems.length,
      incomplete_items: incompleteItems.length,
      completion_rate:
        session.auction_items.length > 0
          ? Math.round((paidItems.length / session.auction_items.length) * 100)
          : 0,
      can_modify: canModify,
      can_complete: unpaidItems.length === 0 && incompleteItems.length === 0,
      restrictions,
    },
  };
}

/**
 * Check if a new session can be created for a specific date
 * Only one session per day is allowed per commissioner, and only for today's date
 */
export async function validateNewSessionCreation(
  commissionerId: string,
  requestedDate: Date,
): Promise<{
  canCreate: boolean;
  existingSession?: {
    id: string;
    status: string;
    payment_status: string;
    date: Date;
  };
  nextAvailableDate: Date;
  error?: string;
}> {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const requestedStartOfDay = new Date(
    requestedDate.getFullYear(),
    requestedDate.getMonth(),
    requestedDate.getDate(),
  );

  // Check if requested date is today
  if (requestedStartOfDay.getTime() !== startOfToday.getTime()) {
    return {
      canCreate: false,
      nextAvailableDate: startOfToday,
      error:
        "Sessions can only be created for today's date. Past or future dates are not allowed.",
    };
  }

  const endOfDay = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);

  // Check for any existing session (ACTIVE or COMPLETED) on today's date
  const existingSession = await prisma.auctionSession.findFirst({
    where: {
      commissioner_id: commissionerId,
      date: {
        gte: startOfToday,
        lt: endOfDay,
      },
    },
    select: {
      id: true,
      status: true,
      payment_status: true,
      date: true,
    },
  });

  const nextAvailableDate = new Date(
    startOfToday.getTime() + 24 * 60 * 60 * 1000,
  ); // Next day at 00:00 AM

  return {
    canCreate: !existingSession,
    existingSession: existingSession || undefined,
    nextAvailableDate,
  };
}
