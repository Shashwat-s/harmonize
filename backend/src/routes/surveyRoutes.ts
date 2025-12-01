import express from 'express';
import { submitSurvey, getSurvey } from '../controllers/surveyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', protect, submitSurvey);
router.get('/:userId', protect, getSurvey);

export default router;
