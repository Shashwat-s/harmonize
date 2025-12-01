import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    post: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model<IComment>('Comment', CommentSchema);
