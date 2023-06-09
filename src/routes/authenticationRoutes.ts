import { authentication } from './../controllers/UserController.js';
import generateVerificationCode from '../utils/generateVerificationCode.js';
import checkingCellPhoneNumber from '../utils/checkingCellPhoneNumber.js';
import express from 'express';

const authenticationRoute = (io: any) => {
  const router = express.Router();
  router.post('/', (req, res) => {
    console.log(`Запрос на /authentication`);

    // создаем новое соединение с сокетом для этого маршрута
    const authSocket = io.of('/authentication');

    authSocket.on('connection', (socket: any) => {
      // client -> server - connection
      const verificationCode = generateVerificationCode();
      console.log(`SERVER - клиент подключен к маршруту /authentication, verificationCode клиента ${verificationCode}`);

      socket.on('phone', (data: any) => {
        // client -> server - phone
        const phoneNumber = checkingCellPhoneNumber(data.number);
        console.log(`phoneNumber ${phoneNumber}, verificationCode ${verificationCode}`);
        console.log('логика отправки/звонка сообщения пользователю');

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

        // если response.statusText === 'OK'
        socket.emit('phoneProcessed', { success: true }); // server -> client - phoneProcessed

        socket.on('verificationCode', (data: any) => {
          // проверка кода от client -> server - verificationCode
          const { verificationCodeClient } = data;
          if (verificationCode === verificationCodeClient) {
            socket.emit('verificationCode', { success: true });
          }
        });
      });

      socket.on('disconnect', () => {
        console.log('клиент отключен от маршрута /authentication');
      });
    });

    res.sendStatus(200);
  });

  return router;
};

// const authenticationRoute = express.Router();

// authenticationRoute.post('/authentication', phoneNumberVerification);
// authenticationRoute.post('/authentication/verification', authentication);

export default authenticationRoute;
