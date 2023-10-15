import { Request, Response, NextFunction } from 'express';
import { tokenController } from '../utils/index.js';
export const checkAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['token'] as string;
  const tokenData = tokenController.verify(token);

  // console.log('middleware ', req.headers);
  return null;
};
