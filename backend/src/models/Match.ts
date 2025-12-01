import mongoose, { Document, Schema } from 'mongoose';

export interface IMatch extends Document {
    users: [mongoose.Types.ObjectId, mongoose.Types.ObjectId];
    compatibilityScore: number;
    status: 'pending' | 'accepted' | 'rejected';
    initiatedBy: mongoose.Types.ObjectId;
    matchedAt: Date;
}

const MatchSchema: Schema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    compatibilityScore: { type: Number, required: true, min: 0, max: 100 },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    initiatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    matchedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Ensure unique match between two users
MatchSchema.index({ users: 1 }, { unique: true });

export default mongoose.model<IMatch>('Match', MatchSchema);
