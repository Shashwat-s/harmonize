import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

interface ErrorResponse {
    success: false;
    error: {
        type: string;
        code: string;
        message: string;
        details?: any;
        statusCode: number;
        timestamp?: string;
        path?: string;
        method?: string;
        stack?: string;
    };
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    let error = err;

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        error = AppError.validationError(
            `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
            { [field]: `${field} must be unique` }
        );
    }

    // Handle MongoDB validation errors
    if (err.name === 'ValidationError') {
        const details: any = {};
        Object.keys(err.errors).forEach((key) => {
            details[key] = err.errors[key].message;
        });
        error = AppError.validationError('Validation failed', details);
    }

    // Handle MongoDB cast errors (invalid ObjectId)
    if (err.name === 'CastError') {
        error = AppError.badRequest(`Invalid ${err.path}: ${err.value}`);
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = AppError.unauthorized('Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        error = AppError.unauthorized('Token expired');
    }

    // Determine status code and error type
    const statusCode = error.statusCode || 500;
    const errorType = error instanceof AppError
        ? error.constructor.name
        : err.name || 'Error';
    const errorCode = error.code || 'INTERNAL_ERROR';

    // Build error response
    const errorResponse: ErrorResponse = {
        success: false,
        error: {
            type: errorType,
            code: errorCode,
            message: error.message || 'Something went wrong',
            statusCode,
        }
    };

    // Add details if available
    if (error.details) {
        errorResponse.error.details = error.details;
    }

    // Add development-only information
    if (process.env.NODE_ENV !== 'production') {
        errorResponse.error.timestamp = new Date().toISOString();
        errorResponse.error.path = req.path;
        errorResponse.error.method = req.method;
        errorResponse.error.stack = error.stack;
    }

    // Log error for debugging
    console.error('❌ Error:', {
        type: errorType,
        code: errorCode,
        message: error.message,
        path: req.path,
        method: req.method,
        statusCode,
        stack: error.stack,
    });

    res.status(statusCode).json(errorResponse);
};
