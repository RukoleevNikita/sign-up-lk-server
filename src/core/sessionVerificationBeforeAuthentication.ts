import { checkingCellPhoneNumber } from '../utils/index.js';

export default async (phoneNumber: string, findOne: any) => {
  const validPhoneNumber = checkingCellPhoneNumber(phoneNumber);

  if (!validPhoneNumber) {
    return {
      success: false,
      message: 'Номер телефона не корректен'
    };
  }

  try {
    const user = await findOne('users', { phoneNumber: validPhoneNumber });

    if (!user) {
      return {
        success: false,
        message: 'Пользователь не найден',
        validPhoneNumber
      };
    }

    const session = await findOne('session', { userId: user._id.toString() });
    if (!session) {
      return {
        success: false,
        message: 'Сессия не запущена',
        validPhoneNumber
      };
    }
    const widgets = await findOne('widgets', { userId: user._id.toString() });
    return {
      success: true,
      data: {
        token: session.token,
        widgets: widgets.widgets
      }
    };
  } catch (err) {
    console.error('Произошла ошибка при обработке запроса: ', err);

    return {
      success: false,
      message: 'Произошла ошибка при обработке запроса',
    };
  }
};
