import { tokenController, getWidgets } from '../utils/index.js';
import { IMongoDBManager } from '../service/index.js';

export const userDataHandler = {
  sessionStart:  async (phoneNumber: string, dbManager: IMongoDBManager) => {
    try {
      const user = await dbManager.findOne('users', { phoneNumber });

      if (!user) {
        const document = await dbManager.insertOne('users', { phoneNumber });
        if (!document) {
          console.error('Пользователь не добавлен в БД.');
          return {
            success: false,
            message: 'Ошибка при взаимодействии с базой данных',
          };
        } else {
          const token = tokenController.create(document._id.toString());
          await dbManager.insertOne('session', { userId: document._id.toString(), token });
          await dbManager.insertOne('widgets', { userId: document._id.toString(), widgets: getWidgets() });

          return {
            success: true,
            data: {
              token,
              widgets: []
            },
          };
        }
      } else {
        const session = await dbManager.findOne('session', { userId: user._id.toString() });
        if (session) {
          const widgets = await dbManager.findOne('widgets', { userId: user._id.toString() });
          if (widgets) {
            return {
              success: true,
              data: {
                token: session.token,
                widgets: widgets.widgets
              }
            };
          }
        } else {
          const token = tokenController.create(user._id.toString());
          await dbManager.insertOne('session', { userId: user._id.toString(), token });

          const widgetsData = await dbManager.findOne('widgets', { userId: user._id.toString() });

          if (widgetsData) {
            return {
              success: true,
              data: {
                token,
                widgets: widgetsData.widgets,
              },
            };
          }
        }
      }

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

