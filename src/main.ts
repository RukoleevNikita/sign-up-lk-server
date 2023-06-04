import express, { Express, Response, Request, ErrorRequestHandler } from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import authenticationRoutes from './routes/authenticationRoutes.js';
/*
  MONGO
  * "username": "rukoleevnikita",
  * "password": "OgM2LHSPGpBDIiCM",
  * "connectLink": "mongodb+srv://USERNAME_MONGO:process.env.PASSWORD_MONGO@cluster0.rahqltj.mongodb.net/"
*/
mongoose
  .set('strictQuery', false)
  .connect(`mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.rahqltj.mongodb.net/`)
  .then(() => console.log('Db is connected'))
  .catch((err) => console.log('Db error', err));

const app: Express = express();
app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});
app.use(express.json());
app.use(cors());

app.use('/api', authenticationRoutes);

// app.post('/api/register', async (req, res) => {
//   // const response = await axios.get('https://smsc.ru/sys/send.php', {
//   const response = await axios.get('https://sms.ru/sms/send', {
//     params: {
//       api_id: process.env.API_KEY_SMSRU,
//       to: '79618833873',
//       sender: 'Сервис запишись',
//       msg: `Подтвердите регистрацию в сервисе signup! Правда сервис еще в стадии разработки!`,
//       // login: process.env.API_LOGIN_SMSC,
//       // psw: process.env.API_PASSWORD_SMSC,
//       // phones: '79618833873',
//       // sender: 'Сервис запишись',
//       // mes: `Подтвердите регистрацию в сервисе signup! Правда сервис еще в стадии разработки!`,
//     },
//   });
//   console.log(response);
// });

const errorHandler: ErrorRequestHandler = (error: Error, req, res, next) => {
  console.error('Ошибка запуска сервера:', error);
  res.status(500).json({ error: 'Server does not  started' });
};
app.use(errorHandler);
app.listen(4445, () => {
  console.log('Server started');
});
