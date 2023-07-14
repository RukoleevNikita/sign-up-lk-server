import { model, Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name?: string;
  phoneNumber: string;
  token: string;
}

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
  name: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

export const UserModel = model<UserDocument>('User', UserSchema);
