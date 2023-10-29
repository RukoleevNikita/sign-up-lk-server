import { Request, Response, NextFunction } from 'express';
import { checkingCellPhoneNumber } from '../utils/index.js';
import { IMongoDBManager } from '../service/index.js';
export const sessionVerificationBeforeAuthenticationMiddleware = (dbManager: IMongoDBManager ) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validPhoneNumber = checkingCellPhoneNumber(req.headers['phone-number'] as string);
      if (!validPhoneNumber) {
        return res.status(404).json({
          success: false,
          message: 'Номер телефона не корректен',
          data: null
        });
      }
      const user = await dbManager.findOne('users', { phoneNumber: validPhoneNumber });

      if (!user) {
        res.locals = {
          success: false,
          message: 'Пользователь не найден',
          validPhoneNumber
        };
        next();
      } else {
        const session = await dbManager.findOne('session', { userId: user._id.toString() });
        if (!session) {
          res.locals = {
            success: false,
            message: 'Сессия не запущена',
            validPhoneNumber
          };
          next();
        } else {
          const widgets = await dbManager.findOne('widgets', { userId: user._id.toString() });
          if (widgets) {
            return res.status(201).json({
              success: true,
              data: {
                token: session.token,
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
