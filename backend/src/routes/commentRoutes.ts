import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/:postId', protect, addComment);
router.get('/:postId', protect, getComments);

export default router;
