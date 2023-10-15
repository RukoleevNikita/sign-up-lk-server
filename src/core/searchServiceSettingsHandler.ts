import { tokenController } from '../utils/index.js';

export const searchServiceSettingsHandler = {
  getSettings:  async (id: string, findOne: any) => {
    try {
      return await findOne('searchservicesettings', { userId: id });
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);

      return {
        success: false,
        data: 'Произошла ошибка при обработке запроса',
      };
    }
  },
  sessionDelete:  async (userId: string, deleteOne: any) => await deleteOne('session', userId)
};

