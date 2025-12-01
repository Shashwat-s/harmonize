import { Request, Response } from 'express';
import User from '../models/User.js';
import Match from '../models/Match.js';
import { calculateCompatibility } from '../services/matchingAlgorithm.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// @desc    Find potential matches (Allies)
// @route   GET /api/matches/find
// @access  Private
export const findMatches = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user._id;

    // Get all users except current user
    // In production, you'd use pagination and filtering to limit this
    const allUsers = await User.find({ _id: { $ne: userId } }).limit(50);

    const potentialMatches = [];

    for (const otherUser of allUsers) {
        // Check if already matched
        const existingMatch = await Match.findOne({
            users: { $all: [userId, otherUser._id] }
        });

        if (!existingMatch) {
            const score = await calculateCompatibility(userId, otherUser._id.toString());

            // Only return high compatibility matches
            if (score > 50) {
                potentialMatches.push({
                    user: {
                        _id: otherUser._id,
                        name: otherUser.name,
                        avatar: otherUser.avatar,
                        bio: otherUser.bio,
                        currentFocus: otherUser.currentFocus,
                        goals: otherUser.goals,
                        skills: otherUser.skills
                    },
                    compatibilityScore: score
                });
            }
        }
    }

    // Sort by compatibility score
    potentialMatches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.json(potentialMatches);
});

// @desc    Get my matches
// @route   GET /api/matches/my-matches
// @access  Private
export const getMyMatches = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user._id;

    const matches = await Match.find({
        users: userId,
        status: 'accepted'
    }).populate('users', 'name avatar currentFocus');

    res.json(matches);
});

// @desc    Request a match
// @route   POST /api/matches/request/:userId
// @access  Private
export const requestMatch = asyncHandler(async (req: Request, res: Response) => {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;

    const existingMatch = await Match.findOne({
        users: { $all: [currentUserId, targetUserId] }
    });

    if (existingMatch) {
        throw AppError.badRequest('Match request already exists');
    }

    const score = await calculateCompatibility(currentUserId, targetUserId);

    const match = await Match.create({
        users: [currentUserId, targetUserId],
        compatibilityScore: score,
        initiatedBy: currentUserId,
        status: 'pending'
    });

    res.status(201).json(match);
});

// @desc    Accept a match
// @route   PUT /api/matches/:matchId/accept
// @access  Private
export const acceptMatch = asyncHandler(async (req: Request, res: Response) => {
    const match = await Match.findById(req.params.matchId);

    if (!match) {
        throw AppError.notFound('Match not found');
    }

    if (!match.users.includes(req.user._id) || match.status !== 'pending') {
        throw AppError.badRequest('Cannot accept this match');
    }

    match.status = 'accepted';
    match.matchedAt = new Date();
    await match.save();
    res.json(match);
});
