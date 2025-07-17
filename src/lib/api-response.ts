import { NextResponse } from 'next/server';

// Standard API response interface
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        code?: string;
        details?: any;
    };
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
        timestamp?: string;
    };
}

// Success response helper
export function createSuccessResponse<T>(
    data: T,
    status: number = 200,
    meta?: ApiResponse<T>['meta']
): NextResponse<ApiResponse<T>> {
    const response: ApiResponse<T> = {
        success: true,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            ...meta,
        },
    };

    return NextResponse.json(response, { status });
}

// Error response helper
export function createErrorResponse(
    message: string,
    status: number = 500,
    code?: string,
    details?: any
): NextResponse<ApiResponse<never>> {
    const response: ApiResponse<never> = {
        success: false,
        error: {
            message,
            code,
            details,
        },
        meta: {
            timestamp: new Date().toISOString(),
        },
    };

    return NextResponse.json(response, { status });
}

// Pagination response helper
export function createPaginatedResponse<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    status: number = 200
): NextResponse<ApiResponse<T[]>> {
    const totalPages = Math.ceil(total / limit);

    return createSuccessResponse(data, status, {
        page,
        limit,
        total,
        totalPages,
    });
}

// Common error responses
export const CommonErrors = {
    // 400 Bad Request
    BadRequest: (message: string = 'Bad request', details?: any) =>
        createErrorResponse(message, 400, 'BAD_REQUEST', details),

    ValidationError: (message: string = 'Validation failed', details?: any) =>
        createErrorResponse(message, 400, 'VALIDATION_ERROR', details),

    // 401 Unauthorized
    Unauthorized: (message: string = 'Unauthorized') =>
        createErrorResponse(message, 401, 'UNAUTHORIZED'),

    InvalidCredentials: (message: string = 'Invalid credentials') =>
        createErrorResponse(message, 401, 'INVALID_CREDENTIALS'),

    TokenExpired: (message: string = 'Token expired') =>
        createErrorResponse(message, 401, 'TOKEN_EXPIRED'),

    // 403 Forbidden
    Forbidden: (message: string = 'Forbidden') =>
        createErrorResponse(message, 403, 'FORBIDDEN'),

    // 404 Not Found
    NotFound: (message: string = 'Resource not found') =>
        createErrorResponse(message, 404, 'NOT_FOUND'),

    // 409 Conflict
    Conflict: (message: string = 'Conflict') =>
        createErrorResponse(message, 409, 'CONFLICT'),

    AlreadyExists: (message: string = 'Resource already exists') =>
        createErrorResponse(message, 409, 'ALREADY_EXISTS'),

    // 422 Unprocessable Entity
    UnprocessableEntity: (message: string = 'Unprocessable entity', details?: any) =>
        createErrorResponse(message, 422, 'UNPROCESSABLE_ENTITY', details),

    // 500 Internal Server Error
    InternalServerError: (message: string = 'Internal server error') =>
        createErrorResponse(message, 500, 'INTERNAL_SERVER_ERROR'),

    DatabaseError: (message: string = 'Database error') =>
        createErrorResponse(message, 500, 'DATABASE_ERROR'),
};
