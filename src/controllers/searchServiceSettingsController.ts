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
import { tokenController } from '../utils/index.js';
import { searchServiceSettingsHandler } from '../core/index.js';

export const getSearchServiceSettings = async (req: any, res: any, dbManager: IMongoDBManager) => {
  try {
    const token = req.headers['token'];
    const tokenData = tokenController.verify(token);
    if (!tokenData) {
      res.status(422).json({
        success: false,
        message: 'Данные не прошли валидацию.',
      });
    } else {
      // const document = await findOne('searchservicesettings', { userId: tokenData?.id });
      const document = await searchServiceSettingsHandler.getSettings(tokenData?.id, dbManager.findOne);

      if (!document) {
        res.status(404).json({
          success: false,
          message: 'Документ не найден.',
        });
      } else {
        res.status(200).json({
          success: true,
          token: token,
          data: document,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера.',
    });
  }
};

export const saveSearchServiceSettings = async (req: any, res: any, insertOne: any) => {
  try {
    const tokenData = tokenController.verify(req.headers['token']);
    const { userDataSearchService } = req.body;
    if (tokenData?.id && userDataSearchService) {
      const { id } = tokenData;
      const result = await insertOne('searchservicesettings', {
        userId: id,
        userDataSearchService,
      });

      if (result) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(404).json({
          success: false,
        });
      }
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
    const token = req.headers['token'];
    const tokenData = tokenController.verify(token);
    if (!tokenData) {
      res.status(422).json({
        success: false,
        message: 'Данные не прошли валидацию.',
      });
    }

    const updatedDoc = await dbManager.updateOne(
      'searchservicesettings',
      { userId: tokenData?.id },
      { $set: req.body }
    );
    if (updatedDoc !== undefined) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Документ не был обновлен.',
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
