import { DataTypes } from 'sequelize';
interface UserServicesObject {
  service: string;
  price: string;
}

export interface UserDataSearchService {
  id: number;
  userId: typeof DataTypes.UUID;
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
  typeUser: number[];
}