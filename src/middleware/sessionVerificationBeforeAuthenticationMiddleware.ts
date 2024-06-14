import { Request, Response, NextFunction } from 'express';
import { checkingCellPhoneNumber } from '../utils/index';
import { Users, Sessions, Widgets } from '../models/models';
export const sessionVerificationBeforeAuthenticationMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const phoneNumber = checkingCellPhoneNumber(req.headers['phone-number'] as string);
      if (!phoneNumber) {
        return res.status(404).json({
          success: false,
          message: 'Номер телефона не корректен',
          data: null
        });
      }
      const user = await Users.findOne({ where: {phoneNumber} });
      if (!user) {
        res.locals = {
          success: false,
          message: 'Пользователь не найден',
          phoneNumber
        };
        next();
      } else {
        const session = await Sessions.findOne({ where: { userId: user.dataValues.id }});
        if (!session) {
          res.locals = {
            success: false,
            message: 'Сессия не запущена',
            phoneNumber
          };
          next();
        } else {
          // const widgets = await Widgets.findOne('widgets', { userId: user._id.toString() });
          const widgets = await Widgets.findOne({ where: { userId: user.dataValues.id }});
          if (widgets) {
            return res.status(201).json({
              success: true,
              data: {
                // FIXME костыль по типизации токена
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                token: session?.token,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                widgets: widgets.widgets
              },
              message: 'Данные о запущенной сессии.'
            });
          }
        }
      }
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);

      return {
        success: false,
        message: 'Произошла ошибка при обработке запроса',
      };
    }
  };
};
