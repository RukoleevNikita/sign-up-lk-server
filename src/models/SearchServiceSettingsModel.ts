import { model, Schema, Document, Model, Types } from 'mongoose';

export interface SearchServiceSettingsDocument extends Document {
  userId: Types.ObjectId;
  activeAccount?: boolean;
  socialNetwork?: string[];
  workPhoneNumber: string;
  firstName?: string;
  lastName?: string;
  userServices?: object[];
  additionalServices?: string[];
  address?: string[];
  whatsapp?: string;
  telegram?: string;
}
// userId: Types.ObjectId;
// workPhoneNumber: string; // рабочий
// firstName?: string;
// lastName?: string;
// userServices?: object[]; объект с названием услоги и ценой [{service: 'Маникюр', price: 4000k}, {service: 'Визажист', price: 3000k}]
// additionalServices // дополнительный перечень услуг
// address?: string; // ТОК Флагман 4 этаж офис 422
// whatsapp?: string; // wa.me/79131465028
// telegram?: string; // ссылка на тг канал или аккаунт - t.me/v_postnova_nails
// activeAccount?: boolean;
// socialNetwork?: string[];
// фото примеров работ
const SearchServiceSettingsSchema: Schema<SearchServiceSettingsDocument> = new Schema<SearchServiceSettingsDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'user',
  },
  activeAccount: {
    type: Boolean,
    required: false,
  },
  socialNetwork: {
    type: [String],
    required: false,
  },
  workPhoneNumber: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  userServices: {
    type: [Object],
    required: false,
  },
  additionalServices: {
    type: [String],
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  whatsapp: {
    type: String,
    required: false,
  },
  telegram: {
    type: String,
    required: false,
  },
});

export const SearchServiceSettingsModel = model<SearchServiceSettingsDocument>(
  'SearchServiceSettings',
  SearchServiceSettingsSchema
);
