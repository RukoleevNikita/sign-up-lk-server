import { Model } from 'sequelize';
import { SearchServiceSettings } from '../../models/models.js';
import { isDeepStrictEqual } from 'util';
import { UserDataSearchService } from './interfaces.js';
export const searchServiceSettingsHandler = {
  getSettings: async (userId: string): Promise<UserDataSearchService | null> => {
    try {
      const searchServiceSettings: Model<UserDataSearchService> | null = await SearchServiceSettings.findOne({
        where: { userId },
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt', 'id']
        }
      });
      return searchServiceSettings?.dataValues ?? null;
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);
      return null;
    }
  },
  saveSettings: async (currentId: string, data: UserDataSearchService): Promise<boolean> => {
    try {
      const existingSearchSettings: Model<UserDataSearchService> | null = await SearchServiceSettings.findOne({
        where: { userId: currentId },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      if (!existingSearchSettings) {
        await SearchServiceSettings.create( {
          userId: currentId,
          activeAccount: data.activeAccount,
          socialNetwork: [...data.socialNetwork],
          workPhoneNumber: data.workPhoneNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          userServices: [...data.userServices],
          additionalServices: [...data.additionalServices],
          address: [...data.address],
          whatsapp: data.whatsapp,
          telegram: data.telegram,
          typeUser: [...data.typeUser]
        });
        return true;
      } else {
        const { userId, id, ...settingsObject } = existingSearchSettings?.dataValues;
        if (!isDeepStrictEqual(data, settingsObject)) {
          Object.entries(data).forEach(([key, value]) => {
            existingSearchSettings.set(key as keyof UserDataSearchService, value);
          });
          await existingSearchSettings.save();
          return true;
        }
        return true;
      }

    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);
      return false;
    }
  },
};

