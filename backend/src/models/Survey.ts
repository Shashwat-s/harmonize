import mongoose, { Document, Schema } from 'mongoose';

export interface ISurvey extends Document {
    user: mongoose.Types.ObjectId;
    responses: {
        questionId: string;
        answer: string | string[] | number;
        category: 'goals' | 'personality' | 'skills' | 'lifestyle' | 'values';
    }[];
    completedAt: Date;
}

const SurveySchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    responses: [{
        questionId: { type: String, required: true },
        answer: { type: Schema.Types.Mixed, required: true },
        category: {
            type: String,
            enum: ['goals', 'personality', 'skills', 'lifestyle', 'values'],
            required: true
        }
    }],
    completedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<ISurvey>('Survey', SurveySchema);
