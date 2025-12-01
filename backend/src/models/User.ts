import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    bio?: string;
    currentFocus?: string;
    location?: string;

    // Goals & Skills
    goals: {
        career?: string[];
        personal?: string[];
        networking?: string[];
        finance?: string[];
    };
    skills: {
        have: string[];
        wantToLearn: string[];
    };

    // Lifestyle Factors
    lifestyle: {
        sleepSchedule?: string;
        workHours?: string;
        fitnessHabits?: string;
        communicationStyle?: string;
        introvertExtrovertScale?: number; // 1-10
    };

    // Gamification
    stats: {
        streak: number;
        lastActive: Date;
        respectScore: number;
        badges: string[];
    };

    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    currentFocus: { type: String },
    location: { type: String },

    goals: {
        career: [{ type: String }],
        personal: [{ type: String }],
        networking: [{ type: String }],
        finance: [{ type: String }]
    },

    skills: {
        have: [{ type: String }],
        wantToLearn: [{ type: String }]
    },

    lifestyle: {
        sleepSchedule: { type: String },
        workHours: { type: String },
        fitnessHabits: { type: String },
        communicationStyle: { type: String },
        introvertExtrovertScale: { type: Number, min: 1, max: 10 }
    },

    stats: {
        streak: { type: Number, default: 0 },
        lastActive: { type: Date, default: Date.now },
        respectScore: { type: Number, default: 0 },
        badges: [{ type: String }]
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
