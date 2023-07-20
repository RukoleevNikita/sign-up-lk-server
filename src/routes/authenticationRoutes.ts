// import { client } from './../redis/redisAuth';
// import { authentication } from './../controllers/UserController.js';
import generateVerificationCode from '../utils/generateVerificationCode.js';
import checkingCellPhoneNumber from '../utils/checkingCellPhoneNumber.js';
import express from 'express';

export const authenticationRoute = (io: any, authentication: any, findOne: any, insertOne: any) => {
  const router = express.Router();
  const authSocket = io.of('/authentication');
  authSocket.on('connection', (socket: any) => {
    // client -> server - connection
    socket.on('phone', (data: any) => {
      const verificationCode: number = generateVerificationCode();
      // client -> server - phone
      const phoneNumber = checkingCellPhoneNumber(data.phone);
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

      // после того как произошла отправка сгенерировного кода пользователю
      // если response.statusText === 'OK'
      setTimeout(() => {
        socket.emit('authenticationProcess', { success: true });
      }, 1000);
      console.log(verificationCode);

      // переписать, возвращать на клиент ошшибку
      socket.on('verificationCode', (data: any) => {
        // проверка кода от client -> server - verificationCode
        if (Number(verificationCode) !== Number(data.code)) {
          // обработка ошибки с отправкой на клиент
          console.log('введен не верный код');
          // return res.status(400).
        } else {
          socket.emit('verificationCode', { success: true });
          authentication(phoneNumber, verificationCode * 4, findOne, insertOne, () => {
            // тут выполняеться логика после функции UserController
          }).then((res: object) => {
            console.log('routes ', res);
            res === null
              ? socket.emit('authToken', { success: false, userData: res }) // userData: null
              : socket.emit('authToken', { success: true, userData: res }); // userData: {id: '', token: ''}
          });
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('клиент отключен от маршрута /authentication');
    });
  });

  router.post('/', async (req, res) => {
    res.send({ message: 'connection socket' });
  });
  return router;
};

// export default authenticationRoute;
