import { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import generateVerificationCode from '../utils/generateVerificationCode.js';
import checkingCellPhoneNumber from '../utils/checkingCellPhoneNumber.js';
import { setAsync, client } from '../redis/redisAuth.js';
import { errorData } from '../utils/errorData.js';
import axios from 'axios';

export const phoneNumberVerification = async (req: Request, res: Response, next: NextFunction) => {
  const verificationCode = generateVerificationCode();
  const response = {
    statusText: 'OK',
  };
  /*
  const response = await axios.get('https://sms.ru/sms/send', {
    //https://smsc.ru/sys/send.php
    params: {
      api_id: process.env.API_KEY_SMSRU,
      to: checkingCellPhoneNumber(req.body.to),
      sender: process.env.SENDER_SMSRU,
      msg: `Ваш код авторизцации ${generateVerificationCode()}`,
      // login: process.env.API_LOGIN_SMSC,
      // psw: process.env.API_PASSWORD_SMSC,
      // phones: '79618833873',
      // sender: 'Сервис запишись',
      // mes: `Подтвердите регистрацию в сервисе signup! Правда сервис еще в стадии разработки!`,
    },
  });
  */
  // console.log(response.data.split('\n'));
  /*
   *
   * 100 - запрос выполнен успешно
   * 0.00 - общая стоимость
   * 1 - Общее количество СМС
   *
   * response.data:
   * data: '100\n9.3\n2\n' - успешно (string - переносом строки)
   * 201 - код ошибки
   */

  /*
    ! TODO
    * обработать statusText
    * отправить на фронт сгенерированый код верификации
    * в случае успешного ввода кода верификации проверить на наличие номера в БД если нет номера добавить создать модель, создать токен/cookie 
  */

  if (response.statusText === 'OK') {
    // const textResponse = errorData[response.data.splice(0, 3)];
    /* установка хэша для сгенерированого кода */
    // if (await client.connect) {
    client.connect().then(() => {
      setAsync('verificationCode', verificationCode)
        .then(() => {
          console.log(verificationCode);
          // next(textResponse);
          next(response);
        })
        .catch((error: ErrorRequestHandler) => {
          console.error('Error saving variable to Redis:', error);
          res.status(500).send('Error saving variable to Redis');
        });
    });

    // }
  } else {
    next('error');
  }
};
