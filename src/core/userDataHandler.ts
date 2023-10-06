// import { generateUserToken, getWidgets } from '../utils/index.js';
import { tokenController, getWidgets } from '../utils/index.js';

export default async (phoneNumber: string, findOne: any, insertOne: any) => {
  try {
    const user = await findOne('users', { phoneNumber });

    if (!user) {
      const document = await insertOne('users', { phoneNumber });
      if (!document) {
        console.error('Пользователь не добавлен в БД.');
        return {
          success: false,
          message: 'Ошибка при взаимодействии с базой данных',
        };
        // тут нужно добавить из document - _id - для генерации токена
      }
      const token = tokenController.create(document._id.toString());
      // const token = generateUserToken(Number(phoneNumber));
      await insertOne('session', { userId: document._id.toString(), token });
      await insertOne('widgets', { userId: document._id.toString(), widgets: getWidgets() });

      return {
        success: true,
        data: {
          token,
          widgets: []
        },
      };
    } else {
      const session = await findOne('session', { userId: user._id.toString() });
      if (session) {
        const widgets = await findOne('widgets', { userId: user._id.toString() });
        return {
          success: true,
          data: {
            token: session.token,
            widgets: widgets.widgets
          }
        };
      } else {
        // const token = generateUserToken(Number(phoneNumber));
        const token = tokenController.create(user._id.toString());
        await insertOne('session', { userId: user._id.toString(), token });

        const widgetsData = await findOne('widgets', { userId: user._id.toString() });

        return {
          success: true,
          data: {
            token,
            widgets: widgetsData.widgets,
          },
        };
      }
    }

  } catch (err) {
    console.error('Произошла ошибка при обработке запроса: ', err);

    return {
      success: false,
      data: 'Произошла ошибка при обработке запроса',
    };
  }
};
