import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    author: mongoose.Types.ObjectId;
    content: string;
    images?: string[];
    tags?: string[];
    respectCount: number;
    commentCount: number;
    likes: mongoose.Types.ObjectId[]; // Users who respected this post
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    tags: [{ type: String }],
    respectCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

export default mongoose.model<IPost>('Post', PostSchema);
