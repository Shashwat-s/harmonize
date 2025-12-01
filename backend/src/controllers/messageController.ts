import { Request, Response } from 'express';
import Message from '../models/Message.js';

// @desc    Get conversation with a user
// @route   GET /api/messages/:userId
// @access  Private
export const getConversation = async (req: Request, res: Response) => {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
        $or: [
            { sender: currentUserId, receiver: otherUserId },
            { sender: otherUserId, receiver: currentUserId }
        ]
    }).sort({ createdAt: 1 });

    res.json(messages);
};

// @desc    Mark message as read
// @route   PUT /api/messages/read/:messageId
// @access  Private
export const markAsRead = async (req: Request, res: Response) => {
    const message = await Message.findById(req.params.messageId);

    if (message) {
        if (message.receiver.toString() === req.user._id.toString()) {
            message.read = true;
            await message.save();
            res.json(message);
        } else {
            res.status(401);
            throw new Error('Not authorized');
        }
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
};
