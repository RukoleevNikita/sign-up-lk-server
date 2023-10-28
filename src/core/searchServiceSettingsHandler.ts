export const searchServiceSettingsHandler = {
  getSettings:  async (id: string, findOne: any) => {
    try {
      return await findOne('SearchServiceSettings', { userId: id });
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);

      return {
        success: false,
        data: 'Произошла ошибка при обработке запроса',
      };
    }
  },
  saveSettings:  async (id: string, insertOne: any, data: any) => {
    try {
      return await insertOne('SearchServiceSettings', {
        userId: id,
        data,
      });
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);

      return {
        success: false,
        data: 'Произошла ошибка при обработке запроса',
      };
    }
  },
  updateSearchServiceSettings:  async (id: string, updateOne: any, data: any) => {
    try {
      return await updateOne(
        'SearchServiceSettings',
        { userId: id },
        { $set: data }
      );
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);

      return {
        success: false,
        data: 'Произошла ошибка при обработке запроса',
      };
    }
  },
};

