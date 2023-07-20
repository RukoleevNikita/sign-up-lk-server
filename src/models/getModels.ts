import { UserModel } from './UserModel.js';
import { SessionModel } from './SessionModel.js';
export function getModel(collectionName: string) {
  switch (collectionName) {
    case 'users':
      return UserModel;
    case 'session':
      return SessionModel;
    default:
      return undefined;
  }
}
