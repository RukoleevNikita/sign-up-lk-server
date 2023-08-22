import { model, Schema, Document, Model, Types } from 'mongoose';

export interface SearchServiceSettingsDocument extends Document {
  userId: Types.ObjectId;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  mail?: string;
  typeUser?: number[];
  address?: string;
  activeAccount?: boolean;
  socialNetwork?: string[];
  // token: string;
}
const SearchServiceSettingsSchema: Schema<SearchServiceSettingsDocument> = new Schema<SearchServiceSettingsDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'user',
  },
  phoneNumber: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  patronymic: {
    type: String,
    required: false,
  },
  mail: {
    type: String,
    required: false,
  },
  typeUser: {
    type: [Number],
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  activeAccount: {
    type: Boolean,
    required: false,
  },
  socialNetwork: {
    type: [String],
    required: false,
  },
  // token: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
});

export const SearchServiceSettingsModel = model<SearchServiceSettingsDocument>(
  'SearchServiceSettings',
  SearchServiceSettingsSchema
);
