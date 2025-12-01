import { Request, Response } from 'express';
import Post from '../models/Post.js';
import Match from '../models/Match.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const { content, images, tags } = req.body;

    if (!content || content.trim() === '') {
        throw AppError.validationError('Content is required', { content: 'Post content cannot be empty' });
    }

    const post = await Post.create({
        author: req.user._id,
        content,
        images,
        tags,
    });

    res.status(201).json(post);
});

// @desc    Get feed posts
// @route   GET /api/posts/feed
// @access  Private
export const getFeed = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user._id;
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 10;

    // Find friends (accepted matches)
    const matches = await Match.find({
        users: userId,
        status: 'accepted'
    });

    const friendIds = matches.map(match =>
        match.users.find(id => id.toString() !== userId.toString())
    );

    // Include user's own ID to see own posts
    friendIds.push(userId);

    const count = await Post.countDocuments({ author: { $in: friendIds } });

    const posts = await Post.find({ author: { $in: friendIds } })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('author', 'name avatar');

    res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Toggle respect (like) on a post
// @route   PUT /api/posts/:id/respect
// @access  Private
export const toggleRespect = asyncHandler(async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        throw AppError.notFound('Post not found');
    }

    const alreadyRespected = post.likes.includes(req.user._id);

    if (alreadyRespected) {
        post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
        post.respectCount -= 1;
    } else {
        post.likes.push(req.user._id);
        post.respectCount += 1;
    }

    await post.save();
    res.json(post);
});

