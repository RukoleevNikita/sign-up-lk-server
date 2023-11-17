import { SearchServiceSettings } from '../models/models.js';
import { isDeepStrictEqual } from 'util';
export const searchServiceSettingsHandler = {
  getSettings:  async (userId: string) => {
    try {
      const searchServiceSettings = await SearchServiceSettings.findOne({where: { userId }});
      return searchServiceSettings?.dataValues.userDataSearchService;
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);

      return {
        success: false,
        data: 'Произошла ошибка при обработке запроса',
      };
    }
  },
  saveSettings:  async (userId: string, data: any) => {
    try {
      const existingSearchSettings = await SearchServiceSettings.findOne({ where: { userId } });
      if (!existingSearchSettings) {
        await SearchServiceSettings.create( {
          userId,
          userDataSearchService: {...data},
        });
        return true;
      } else {
        if (!isDeepStrictEqual(data, existingSearchSettings.dataValues.userDataSearchService)) {
          existingSearchSettings.setDataValue('userDataSearchService', data);
          await existingSearchSettings.save();
          return true;
        }
        return true;
      }

    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);
      return {
        success: false,
        data: 'Произошла ошибка при обработке запроса',
      };
    }
  },
};

