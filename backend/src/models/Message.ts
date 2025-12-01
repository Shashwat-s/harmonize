import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    content: string;
    read: boolean;
    createdAt: Date;
}

const MessageSchema: Schema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Index for faster query of conversation history
MessageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
