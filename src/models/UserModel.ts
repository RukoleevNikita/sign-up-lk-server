import { model, Schema, Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  phoneNumber: string;
  createdAt: Date;
  // firstName?: string;
  // lastName?: string;
  // patronymic?: string;
  // mail?: string;
  // typeUser?: number[];
  // address?: string;
  // token: string;
}
const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
  phoneNumber: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // firstName: {
  //   type: String,
  //   required: false,
  // },
  // lastName: {
  //   type: String,
  //   required: false,
  // },
  // patronymic: {
  //   type: String,
  //   required: false,
  // },
  // mail: {
  //   type: String,
  //   required: false,
  // },
  // typeUser: {
  //   type: [Number],
  //   required: false,
  // },
  // address: {
  //   type: String,
  //   required: false,
  // },
  // token: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
});

export const UserModel = model<UserDocument>('user', UserSchema);
