import { Request, Response, NextFunction } from 'express';
import { tokenController } from '../utils/index.js';
import { Sessions } from '../models/models.js';
export const checkAuthenticationMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers['token'] as string;
      const userId = token ? tokenController.verify(token)?.id : null;
      if (userId !== null && userId !== undefined) {
        if (await Sessions.findOne({where:  { userId }})) {
          res.locals = { id: userId, token: token };
          // console.log('token ', token);
          // console.log('userId ', userId);
          next();
        } else {
          return res.status(404).json({
            success: false,
            message: "Данные не валидные или отсутсвуют."
          });
        }
      } else {
        return res.status(403).json({
          message: "Нет доступа"
        });
      }
    } catch (error) {
      console.error('Произошла ошибка при обработке запроса: ', error);
      return {
        success: false,
        data: 'Произошла ошибка при обработке запроса',
      };
    }
  };
};
