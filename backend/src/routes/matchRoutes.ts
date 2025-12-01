import express from 'express';
import { findMatches, getMyMatches, requestMatch, acceptMatch } from '../controllers/matchController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/find', protect, findMatches);
router.get('/my-matches', protect, getMyMatches);
router.post('/request/:userId', protect, requestMatch);
router.put('/:matchId/accept', protect, acceptMatch);

export default router;
