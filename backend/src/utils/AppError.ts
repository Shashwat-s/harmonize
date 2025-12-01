export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly isOperational: boolean;
    public readonly details?: any;

    constructor(
        message: string,
        statusCode: number,
        code: string,
        details?: any
    ) {
        super(message);

        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        this.details = details;

        // Maintains proper stack trace for where our error was thrown
        Error.captureStackTrace(this, this.constructor);
    }

    // Static factory methods for common errors
    static badRequest(message: string, details?: any) {
        return new AppError(message, 400, 'BAD_REQUEST', details);
    }

    static unauthorized(message: string = 'Unauthorized') {
        return new AppError(message, 401, 'UNAUTHORIZED');
    }

    static forbidden(message: string = 'Forbidden') {
        return new AppError(message, 403, 'FORBIDDEN');
    }

    static notFound(message: string = 'Resource not found') {
        return new AppError(message, 404, 'NOT_FOUND');
    }

    static validationError(message: string, details?: any) {
        return new AppError(message, 400, 'VALIDATION_ERROR', details);
    }

    static authError(message: string = 'Authentication failed') {
        return new AppError(message, 401, 'AUTH_ERROR');
    }

    static internal(message: string = 'Internal server error') {
        return new AppError(message, 500, 'INTERNAL_ERROR');
    }
}
