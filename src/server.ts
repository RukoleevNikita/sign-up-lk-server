import express, { Express, Response, Request, ErrorRequestHandler } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createServer } from 'http';
import swaggerDocs from './swagger/swagger.js';
import MongoDBManager from './service/index.js';
// import isAuthenticated from './utils/isAuthenticated.js';
import { profileRoutes, settingsRoutes, authenticationRoutes, paramsRoutes } from './routes/index.js';
import { checkAuthenticationMiddleware } from './middleware/index.js';

/*
  TODO:
    * шифровать в токен _id пользователя и данные
    * Закрытие соединения с Redis после использования redisClient.quit();
    * пересылать только ТОКЕН, ID - нельзя!!!!
*/

const dbManager = new MongoDBManager(`${process.env.MONGODB_URI}`);
dbManager.connect();
const app: Express = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

const httpServer = createServer(app);

app.get('/', (req, res) => res.send(200));
app.use('/api/authentication', authenticationRoutes(dbManager));
app.use('/api/settings', checkAuthenticationMiddleware, settingsRoutes(dbManager)); // написать проверку авторизации
app.use('/api/get-params', paramsRoutes()); // написать проверку авторизации
// app.use('/main', isAuthenticated, protectedRouter(io));
// app.use('/api/user-settings', isAuthenticated, settingsControlRoutes());

const errorHandler: ErrorRequestHandler = (error: Error, req, res, next) => {
  console.error('Ошибка запуска сервера:', error);
  res.status(500).json({ error: 'Server does not  started' });
};
app.use(errorHandler);
httpServer.listen(4445, () => {
  swaggerDocs(app, 4445);
  console.log('Server started');
});
