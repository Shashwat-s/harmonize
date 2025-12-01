import { Request, Response } from 'express';
import Survey from '../models/Survey.js';


// @desc    Submit survey responses
// @route   POST /api/survey/submit
// @access  Private
export const submitSurvey = async (req: Request, res: Response) => {
    const { responses } = req.body;
    const userId = req.user._id;

    // Check if survey already exists for user
    const existingSurvey = await Survey.findOne({ user: userId });

    if (existingSurvey) {
        existingSurvey.responses = responses;
        existingSurvey.completedAt = new Date();
        await existingSurvey.save();

        // Update user profile based on survey (simplified for now)
        // In a real app, you'd parse specific answers to update goals/skills/lifestyle

        res.json(existingSurvey);
    } else {
        const survey = await Survey.create({
            user: userId,
            responses,
        });

        // Update user profile to mark survey as completed (if we had a flag)
        // For now, just return the survey

        res.status(201).json(survey);
    }
};

// @desc    Get user survey
// @route   GET /api/survey/:userId
// @access  Private
export const getSurvey = async (req: Request, res: Response) => {
    const survey = await Survey.findOne({ user: req.params.userId });

    if (survey) {
        res.json(survey);
    } else {
        res.status(404);
        throw new Error('Survey not found');
    }
};
