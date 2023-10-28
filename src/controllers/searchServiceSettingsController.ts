// {
//   id: '64dd89340a7a3c2caba604d2',
//   userDataSearchService: {
//     activeAccount: true,
//     socialNetwork: [ 'instagram/link', 'vk/name' ],
//     workPhoneNumber: '89136553626',
//     firstName: 'Никита',
//     lastName: 'Руколеев',
//     userServices: [ [Object], [Object] ],
//     additionalServices: [ 'Аппаратный маникюр', 'Классический маникюр' ],
//     address: [ 'ТОК Флагман 4 этаж офис 422' ],
//     whatsapp: 'wa.me/79131465028',
//     telegram: 't.me/v_postnova_nails'
//   }
// }
import { IMongoDBManager } from '../service/index.js';
import { searchServiceSettingsHandler } from '../core/index.js';

export const getSearchServiceSettings = async (req: any, res: any, dbManager: IMongoDBManager) => {
  try {
    const document = await searchServiceSettingsHandler.getSettings(res.locals.id, dbManager.findOne);
    if (!document) {
      res.status(404).json({
        success: false,
        message: 'Документ не найден.',
      });
    } else {
      res.status(200).json({
        success: true,
        token: res.locals.token,
        data: document,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера.',
    });
  }
};

export const saveSearchServiceSettings = async (req: any, res: any, dbManager: IMongoDBManager) => {
  try {
    const resultSaving = await searchServiceSettingsHandler.saveSettings(res.locals.id, dbManager.insertOne, req.body.userDataSearchService);
    if (!resultSaving) {
      res.status(404).json({
        success: false,
        message: 'Ошибка при сохранении настроек пользователя.',
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера.',
    });
  }
};

export const updateSearchServiceSettings = async (req: any, res: any, dbManager: IMongoDBManager) => {
  try {
    const updateResult = await searchServiceSettingsHandler.updateSearchServiceSettings(res.locals.id, dbManager.updateOne, req.body);
    if (updateResult.modifiedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Документ не был обновлен.',
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера.',
    });
  }
};
