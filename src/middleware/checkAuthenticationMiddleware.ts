import { Request, Response, NextFunction } from 'express';
import { tokenController } from '../utils/index.js';
import { IMongoDBManager } from '../service/index.js';
export const checkAuthenticationMiddleware = (dbManager: IMongoDBManager ) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers['token'] as string;
      const userId = token ? tokenController.verify(token)?.id : null;
      if (userId !== null && userId !== undefined) {
        if (await dbManager.findOne('session', { userId: userId })) {
          res.locals = { id: userId, token: token };
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
