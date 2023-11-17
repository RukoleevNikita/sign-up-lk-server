import { tokenController, getWidgets } from '../utils/index.js';
import { Users, Sessions, Widgets } from '../models/models.js';

export const userDataHandler = {
  sessionStart:  async (phoneNumber: string) => {
    try {
      const user = await Users.findOne({ where: {phoneNumber} });
      if (!user) {
        const document = await Users.create({ phoneNumber });
        if (!document) {
          console.error('Пользователь не добавлен в БД.');
          return {
            success: false,
            message: 'Ошибка при взаимодействии с базой данных',
          };
        } else {
          const token = tokenController.create(document.dataValues.id.toString());
          await Sessions.create({ userId: document.dataValues.id.toString(), token });
          await Widgets.create({ userId: document.dataValues.id.toString(), widgets: getWidgets() });
          // добавить проверку для обработки ошибок при добавлении в БД
          // if (!document) {
          //   console.error('Пользователь не добавлен в БД.');
          //   return {
          //     success: false,
          //     message: 'Ошибка при взаимодействии с базой данных',
          //   };
          return {
            success: true,
            data: {
              token,
              widgets: []
            },
          };
        }
      } else {
        const session = await Sessions.findOne({ where: { userId: user.dataValues.id.toString() }});
        if (session) {
          const widgets = await Widgets.findOne({ where: { userId: user.dataValues.id }});
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
          const token = tokenController.create(user.dataValues.id.toString());
          await Sessions.create({ userId: user.dataValues.id.toString(), token });

          const widgets = await Widgets.findOne({ where: { userId: user.dataValues.id }});
          if (widgets) {
            return {
              success: true,
              data: {
                token,
                widgets: widgets.widgets,
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
  sessionDelete:  async (userId: string) => await Sessions.destroy({ where: {userId}})
};

