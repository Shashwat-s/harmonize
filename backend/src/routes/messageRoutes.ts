import express from 'express';
import { getConversation, markAsRead } from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', protect, getConversation);
router.put('/read/:messageId', protect, markAsRead);

export default router;
