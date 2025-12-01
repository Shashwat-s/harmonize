import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        const missingFields: any = {};
        if (!name) missingFields.name = 'Name is required';
        if (!email) missingFields.email = 'Email is required';
        if (!password) missingFields.password = 'Password is required';

        throw AppError.validationError('Missing required fields', missingFields);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw AppError.validationError('Invalid email format', { email: 'Please provide a valid email address' });
    }

    // Validate password strength
    if (password.length < 6) {
        throw AppError.validationError('Password too weak', { password: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw AppError.validationError('User already exists', { email: 'An account with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (!user) {
        throw AppError.internal('Failed to create user');
    }

    const token = generateToken(user._id.toString());

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
    });
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        const missingFields: any = {};
        if (!email) missingFields.email = 'Email is required';
        if (!password) missingFields.password = 'Password is required';

        throw AppError.validationError('Missing required fields', missingFields);
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw AppError.authError('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
        throw AppError.authError('Invalid email or password');
    }

    const token = generateToken(user._id.toString());

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token,
    });
});

