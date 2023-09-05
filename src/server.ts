import express, { Express, Response, Request, ErrorRequestHandler } from 'express';
// import session from 'express-session';
import 'dotenv/config';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import swaggerDocs from './swagger/swagger.js';
// import cookieParser from 'cookie-parser';

import MongoDBManager from './service/databaseService.js';
import { authenticationSocket } from './sockets/authenticationSocket.js';
import { authenticationController } from './controllers/index.js';
import isAuthenticated from './utils/isAuthenticated.js';
// import authenticationRoutes from './routes/authenticationRoutes.js';
// import { cookieOptions } from './cookieOptions.js';
import { profileRoutes, settingsRoutes, authenticationRoutes, paramsRoutes } from './routes/index.js';

/*
  MONGO
  * "username": "rukoleevnikita",
  * "password": "OgM2LHSPGpBDIiCM",
  * "connectLink": "mongodb+srv://USERNAME_MONGO:process.env.PASSWORD_MONGO@cluster0.rahqltj.mongodb.net/"
*/
// mongoose
//   .set('strictQuery', false)
//   .connect(`mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.rahqltj.mongodb.net/`)
//   .then(() => console.log('Db is connected'))
//   .catch((err) => console.log('Db error', err));

const dbManager = new MongoDBManager(
  `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.rahqltj.mongodb.net/`
);
dbManager.connect();
const app: Express = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
// app.use(cookieParser());
// app.use(
//   session({
//     secret: 'your-secret-key', // Секретный ключ для подписания cookie
//     resave: false,
//     saveUninitialized: false,
//     cookie: cookieOptions, // Используем настройки cookie из отдельного модуля
//   })
// );
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => res.send(200));
// app.use('/api/authentication', authenticationRoute(io, userController.authentication, dbManager));
app.use(
  '/api/authentication',
  authenticationSocket(io, authenticationController, dbManager.findOne, dbManager.insertOne)
);
app.use('/api/authorization-control', authenticationRoutes(dbManager.deleteOne, dbManager.findOne)); // написать проверку авторизации
app.use('/api/settings', settingsRoutes(dbManager.findOne)); // написать проверку авторизации
app.use('/api/get-params', paramsRoutes(dbManager.findOne)); // написать проверку авторизации
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
