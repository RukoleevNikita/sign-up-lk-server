// import bcrypt from 'bcrypt';
// import UserModel from '../modules/User';
// import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import { getAsync } from '../redis/redisAuth.js';
import axios from 'axios';

export const authentication = async (req: any, res: any) => {
  try {
    // getAsync('verificationCode')
    //     // Обработка переменной
    //     console.log('nextReq', verificationCode); // Вывод переменной в консоль или делайте с ней что-то еще
    //     res.send('Variable processed'); // Отправка ответа клиенту
    // })
    //
    // number check (validation)
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) return res.status(400).json(errors.array());
  } catch (error) {}
};
