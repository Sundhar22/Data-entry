import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { CommonErrors, createErrorResponse } from './api-response';

// Custom error classes
export class AppError extends Error {
    public statusCode: number;
    public code: string;
    public details?: any;

    constructor(message: string, statusCode: number = 500, code?: string, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.code = code || 'UNKNOWN_ERROR';
        this.details = details;
        this.name = 'AppError';
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 400, 'VALIDATION_ERROR', details);
        this.name = 'ValidationError';
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication failed') {
        super(message, 401, 'AUTHENTICATION_ERROR');
        this.name = 'AuthenticationError';
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string = 'Authorization failed') {
        super(message, 403, 'AUTHORIZATION_ERROR');
        this.name = 'AuthorizationError';
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404, 'NOT_FOUND');
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Resource conflict') {
        super(message, 409, 'CONFLICT');
        this.name = 'ConflictError';
    }
}

// Global error handler function
export function handleApiError(error: unknown, context?: string): NextResponse {
    // Log the error for debugging
    console.error(`[API Error${context ? ` - ${context}` : ''}]:`, error);

    // Handle custom AppError
    if (error instanceof AppError) {
        return createErrorResponse(
            error.message,
            error.statusCode,
            error.code,
            error.details
        );
    }

    // Handle Zod validation errors
    if (error instanceof ZodError) {
        const validationErrors = error.issues.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message,
        }));

        return CommonErrors.ValidationError(
            'Validation failed',
            validationErrors
        );
    }

    // Handle Prisma errors by checking error properties
    if (error && typeof error === 'object' && 'code' in error) {
        return handlePrismaError(error as any);
    }

    // Handle JWT errors
    if (error instanceof Error) {
        if (error.name === 'JsonWebTokenError') {
            return CommonErrors.Unauthorized('Invalid token');
        }
        if (error.name === 'TokenExpiredError') {
            return CommonErrors.TokenExpired('Token has expired');
        }
        if (error.name === 'NotBeforeError') {
            return CommonErrors.Unauthorized('Token not active');
        }
    }

    // Handle generic errors
    if (error instanceof Error) {
        // Don't expose internal error messages in production
        const message = process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : error.message;

        return CommonErrors.InternalServerError(message);
    }

    // Fallback for unknown error types
    return CommonErrors.InternalServerError('An unexpected error occurred');
}

// Handle specific Prisma error codes
function handlePrismaError(error: any): NextResponse {
    const code = error.code;

    switch (code) {
        case 'P2002':
            // Unique constraint violation
            const field = error.meta?.target as string[] | undefined;
            const fieldName = field ? field[0] : 'field';
            return CommonErrors.Conflict(`${fieldName} already exists`);

        case 'P2025':
            // Record not found
            return CommonErrors.NotFound('Record not found');

        case 'P2003':
            // Foreign key constraint violation
            return CommonErrors.BadRequest('Invalid reference to related record');

        case 'P2014':
            // Required relation violation
            return CommonErrors.BadRequest('Required relation missing');

        case 'P2015':
            // Required record not found
            return CommonErrors.NotFound('Required record not found');

        case 'P2021':
            // Table does not exist
            return CommonErrors.InternalServerError('Database table not found');

        case 'P2022':
            // Column does not exist
            return CommonErrors.InternalServerError('Database column not found');

        default:
            return CommonErrors.DatabaseError(
                process.env.NODE_ENV === 'production'
                    ? 'Database error'
                    : `Database error: ${error.message}`
            );
    }
}

// Async error wrapper for API routes
export function withErrorHandling<T extends any[], R>(
    handler: (...args: T) => Promise<R>,
    context?: string
) {
    return async (...args: T): Promise<R | NextResponse> => {
        try {
            return await handler(...args);
        } catch (error) {
            return handleApiError(error, context);
        }
    };
}

// Type guard for NextResponse
export function isNextResponse(value: any): value is NextResponse {
    return value && typeof value === 'object' && 'status' in value;
}
