import express from 'express';
import { createPost, getFeed, toggleRespect } from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/feed', protect, getFeed);
router.put('/:id/respect', protect, toggleRespect);

export default router;
