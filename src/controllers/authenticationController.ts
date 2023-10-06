import NodeCache from 'node-cache';
import { sessionVerificationBeforeAuthentication, userDataHandler } from '../core/index.js';
import { IMongoDBManager } from '../service/index.js';
import { tokenController } from '../utils/index.js';
const cache = new NodeCache({ stdTTL: 90 });
//тест коментов
/*
* test coments
* */
export const authentication = {
  sendCode:  async (req: any, res: any, dbManager: IMongoDBManager) => {
    try {
      const sessionVerificationData = await sessionVerificationBeforeAuthentication((req.headers['phone-number'] ?? ''), dbManager.findOne);
      const requestCounter = cache.get(`${sessionVerificationData.validPhoneNumber}_count_sendCode`) || 0;
      // 3 минуты храниться в кеше информация о количестве запросов
      cache.set(`${sessionVerificationData.validPhoneNumber}_count_sendCode`, Number(requestCounter) + 1, 180);
      // проверка на количество запросов
      if (Number(cache.get(`${sessionVerificationData.validPhoneNumber}_count_sendCode`)) > 4) {
        return res.status(429).json({
          success: false,
          message: 'Превышен лимит запросов. Пожалуйста, подождите.'
        });
      }

      if (!sessionVerificationData.success && !sessionVerificationData.validPhoneNumber) {
        // 'Номер телефона не корректен' или 'Произошла ошибка при обработке запроса'
        return res.status(404).json({
          success: sessionVerificationData.success,
          message: sessionVerificationData.message,
          data: null
        });
      }

      // проверка для случая если клиент оправил код, но сразу перезагрузил страницу (описать позже)
      // добавить статус отправки смс в кеш и ниже проверять если отправлено успешно и номер с запроса и номер из кеша то можно пропустить
      // if (req.headers['phone-number'] === cache.get(`${sessionVerificationData.validPhoneNumber}_phoneNumber`)) {
      //   return res.status(200).json({
      //     success: true,
      //   });
      // }
      // если данных о сесии нет в бд
      if (!sessionVerificationData.success && sessionVerificationData.validPhoneNumber) {
        // 'Пользователь не найден' и 'Сессия не запущена'

        // const verificationCode: number = generateVerificationCode();
        const verificationCode = 1234; // на время разработки

        /* отправка проверочного кода клиенту
            const response = await axios.get('https://sms.ru/sms/send', {
                  //https://smsc.ru/sys/send.php
                  params: {
                    api_id: process.env.API_KEY_SMSRU,
                    to: sessionVerificationData.number,
                    sender: process.env.SENDER_SMSRU,
                    msg: `Ваш код авторизцации ${verificationCode}`,
                    // login: process.env.API_LOGIN_SMSC,
                    // psw: process.env.API_PASSWORD_SMSC,
                    // phones: '79618833873',
                    // sender: 'Сервис запишись',
                    // mes: `Подтвердите регистрацию в сервисе signup! Правда сервис еще в стадии разработки!`,
                  },
                });
            */
        // после того как произошла отправка сгенерировного кода пользователю
        // если response.statusText === 'OK' сообщение успешно отправлено клиенту
        // if (response.statusText === 'OK') {
        cache.set(`${sessionVerificationData.validPhoneNumber}_code`, verificationCode, 90); // добавление в кеш на 90 секунд
        cache.set(`${sessionVerificationData.validPhoneNumber}_phoneNumber`, `${sessionVerificationData.validPhoneNumber}`, 90);
        // cache.set(`${response.statusText}_sendStatus`, `${response.statusText.validPhoneNumber}`, 90);
        return res.status(200).json({
          success: true,
        });
        // } else {
        // ошибка отправки сообщения
        // res.status(400).json({
        //   success: false,
        //   data: 'Ошибка отправки сообщения `${errorData(response.status...)}`'
        // });
        // }
      } else {
        // данные о запущенной сесии
        return res.status(201).json({
          success: sessionVerificationData.success,
          data: sessionVerificationData.data,
          message: 'Данные о запущенной сессии'
        });
      }
    } catch (error) {
      console.log('authentication send error ', error);
    }
  },
  checkCode: async (req: any, res: any, dbManager: IMongoDBManager) => {
    try {
      const phoneNumber = req.headers['phone-number'];
      const cachePhoneNumber = cache.get(`${phoneNumber}_phoneNumber`);
      const requestCounter = cache.get(`${phoneNumber}_count_checkCode`) || 0;
      cache.set(`${phoneNumber}_count_checkCode`, Number(requestCounter) + 1, 180);
      // console.log('phoneNumber, cachePhoneNumber ', typeof phoneNumber, typeof  cachePhoneNumber);
      if (Number(cache.get(`${phoneNumber}_count_checkCode`)) > 4) {
        return res.status(429).json({
          success: false,
          message: 'Превышен лимит запросов. Пожалуйста, подождите.'
        });
      }
      if (phoneNumber !== cachePhoneNumber) {
        return res.status(422).json({
          success: false,
          message: 'Данные не прошли валидацию'
        });
      }
      const cacheCode = cache.get(`${phoneNumber}_code`);
      const verificationCodeClient = req.headers['verification-code'];
      // console.log('cacheCode, verificationCodeClient ', cacheCode, verificationCodeClient);
      if (String(cacheCode) !== verificationCodeClient) {
        return res.status(423).json({
          success: false,
          message: 'Введен не верный код'
        });
      }
      // после успешного добавления пользователя закрыть соединение с монго и отчистить все кеши
      const processingData = await userDataHandler.sessionStart(phoneNumber, dbManager.findOne, dbManager.insertOne);
      if (!processingData.success) {
        return res.status(400).json({
          success: processingData.success,
          message: processingData.message
        });
      }
      cache.flushAll();
      return res.status(200).json({
        success: processingData.success,
        message: '...............',
        data: processingData.data

      });
    } catch (error) {
      console.log('authentication checkCode error ', error);
    }
  },
  deleteAuthentication:  async (req: any, res: any, dbManager: IMongoDBManager) => {
    // добавить дисконект от бд
    try {
      const token = req.headers['token'];
      const tokenData = tokenController.verify(token);

      if (!tokenData) {
        return res.status(400).json({
          success: false,
          msg: 'Не валидный токен',
        });
      }

      const deletedSession = await userDataHandler.sessionDelete(tokenData.id, dbManager.deleteOne);

      if (!deletedSession) {
        return res.status(404).json({
          success: false,
          msg: 'Сессии не существует',
        });
      }

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  },
  // не реализовано
  checkAuthentication: async (req: any, res: any, dbManager: IMongoDBManager) => {
    // try {
    //   const session = await dbManager.findOne('session', { userId: req.body.id });
    //   if (session === null) {
    //     res.status(404).json({
    //       success: false,
    //       msg: 'Пользователь не авторизован',
    //     });
    //   } else {
    //     // res.status(200).json({
    //     //   success: true,
    //     //   msg: { id: session.userId, token: session.token },
    //     // });
    //   }
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({
    //     error: error,
    //   });
    // }
  }
};