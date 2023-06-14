// import { client } from './../redis/redisAuth';
import { authentication } from './../controllers/UserController.js';
import generateVerificationCode from '../utils/generateVerificationCode.js';
import checkingCellPhoneNumber from '../utils/checkingCellPhoneNumber.js';
import express from 'express';

const authenticationRoute = (io: any) => {
  const router = express.Router();
  console.log(`Запрос на /authentication`);
  const authSocket = io.of('/authentication');

  authSocket.on('connection', (socket: any) => {
    // client -> server - connection
    socket.on('phone', (data: any) => {
      const verificationCode = generateVerificationCode();
      // client -> server - phone
      // const phoneNumber = checkingCellPhoneNumber(data.number);
      console.log(`phoneNumber ${data.phone}, verificationCode ${verificationCode}`);

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
        socket.emit('phoneProcessed', { success: true }); // server -> client - phoneProcessed
      }, 1000);

      socket.on('verificationCode', (data: any) => {
        // проверка кода от client -> server - verificationCode
        console.log('data.code ', data.code);
        console.log('verificationCode ', verificationCode);
        // const { verificationCodeClient } = data;
        // if (verificationCode === data.code) {
        //   console.log(true);

        // socket.emit('verificationCode', { success: true });
        // }
      });
    });

    socket.on('disconnect', () => {
      console.log('клиент отключен от маршрута /authentication');
    });
  });

  router.post('/', async (req, res) => {
    res.send({ message: 'aa' });
  });
  return router;
};

// const authenticationRoute = express.Router();

// authenticationRoute.post('/authentication', phoneNumberVerification);
// authenticationRoute.post('/authentication/verification', authentication);

export default authenticationRoute;
