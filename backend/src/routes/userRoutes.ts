import express from 'express';
import { getUserProfile, updateUserProfile, updateGoals, updateSkills } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile/:id', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/goals', protect, updateGoals);
router.put('/skills', protect, updateSkills);

export default router;
