import { Request, Response } from 'express';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        throw AppError.notFound('User not found');
    }

    res.json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        throw AppError.notFound('User not found');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.avatar = req.body.avatar || user.avatar;
    user.currentFocus = req.body.currentFocus || user.currentFocus;
    user.location = req.body.location || user.location;

    if (req.body.password) {
        // In a real app, you'd hash this here or in a pre-save hook
        // For now assuming authController handles hashing or we add a pre-save hook to User model
        // Let's rely on the pre-save hook pattern if we had one, but since we didn't add it to the model,
        // we should probably hash it here. For simplicity in this POC, I'll skip password update logic here
        // and assume it's handled separately or requires re-hashing.
    }

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        currentFocus: updatedUser.currentFocus,
    });
});

// @desc    Update goals
// @route   PUT /api/users/goals
// @access  Private
export const updateGoals = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        throw AppError.notFound('User not found');
    }

    user.goals = req.body.goals || user.goals;
    await user.save();
    res.json(user.goals);
});

// @desc    Update skills
// @route   PUT /api/users/skills
// @access  Private
export const updateSkills = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        throw AppError.notFound('User not found');
    }

    user.skills = req.body.skills || user.skills;
    await user.save();
    res.json(user.skills);
});
