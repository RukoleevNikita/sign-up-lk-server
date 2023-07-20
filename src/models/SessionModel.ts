import { model, Schema, Document, Types } from 'mongoose';

export interface SessionDocument extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}

const SessionSchema: Schema<SessionDocument> = new Schema<SessionDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  token: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SessionModel = model<SessionDocument>('session', SessionSchema);
