import { model, Schema, Document, Model, Types } from 'mongoose';
// export interface SearchServiceSettingsDocument extends Document {
//   userId: Types.ObjectId;
//   activeAccount?: boolean;
//   socialNetwork?: string[];
//   workPhoneNumber: string;
//   firstName?: string;
//   lastName?: string;
//   userServices?: object[];
//   additionalServices?: string[];
//   address?: string[];
//   whatsapp?: string;
//   telegram?: string;
// }
// {
//   id: '64dd89340a7a3c2caba604d2',
//   userDataSearchService: {
//     activeAccount: true,
//     socialNetwork: [ 'instagram/link', 'vk/name' ],
//     workPhoneNumber: '89136553626',
//     firstName: 'Никита',
//     lastName: 'Руколеев',
//     userServices: [{"service": "Маникюр", "price": "4000k"}, {"service": "Визажист", "price": "3000k"}],
//     additionalServices: [ 'Аппаратный маникюр', 'Классический маникюр' ],
//     address: [ 'ТОК Флагман 4 этаж офис 422' ],
//     whatsapp: 'wa.me/79131465028',
//     telegram: 't.me/v_postnova_nails'
//   }
// }
// фото примеров работ
interface UserServicesObject {
  service: string;
  price: string;
}

interface UserDataSearchService {
  activeAccount: boolean;
  socialNetwork: string[];
  workPhoneNumber: string;
  firstName: string;
  lastName: string;
  userServices: UserServicesObject[];
  additionalServices: string[];
  address: string[];
  whatsapp: string;
  telegram: string;
}

export interface SearchServiceSettingsDocument extends Document {
  userId: Types.ObjectId;
  userDataSearchService: UserDataSearchService;
}


const SearchServiceSettingsSchema = new Schema<SearchServiceSettingsDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'user'
  },
  userDataSearchService: {
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
      type: [String],
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
  },
});

export const SearchServiceSettingsModel = model<SearchServiceSettingsDocument>(
  'SearchServiceSettings',
  SearchServiceSettingsSchema
);
