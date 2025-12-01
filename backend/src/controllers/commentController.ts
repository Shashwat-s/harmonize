import { Request, Response } from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// @desc    Add a comment
// @route   POST /api/comments/:postId
// @access  Private
export const addComment = async (req: Request, res: Response) => {
    const { content } = req.body;
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const comment = await Comment.create({
        post: postId,
        author: req.user._id,
        content,
    });

    post.commentCount += 1;
    await post.save();

    const populatedComment = await comment.populate('author', 'name avatar');

    res.status(201).json(populatedComment);
};

// @desc    Get comments for a post
// @route   GET /api/comments/:postId
// @access  Private
export const getComments = async (req: Request, res: Response) => {
    const comments = await Comment.find({ post: req.params.postId })
        .sort({ createdAt: 1 })
        .populate('author', 'name avatar');

    res.json(comments);
};
