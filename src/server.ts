import express, { Express, Response, Request, ErrorRequestHandler } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { sequelize } from './service/index.js';
import { createServer } from 'http';
import swaggerDocs from './swagger/swagger.js';
// import isAuthenticated from './utils/isAuthenticated.js';
import { profileRoutes, settingsRoutes, authenticationRoutes, paramsRoutes } from './routes/index.js';
import { checkAuthenticationMiddleware } from './middleware/index.js';


const app: Express = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
const httpServer = createServer(app);
const errorHandler: ErrorRequestHandler = (error: Error, req, res, next) => {
  console.error('Ошибка запуска сервера:', error);
  res.status(500).json({ error: 'Server does not  started' });
};
app.use(errorHandler);
app.use('/api/authentication', authenticationRoutes());
app.use('/api/settings', checkAuthenticationMiddleware(), settingsRoutes());
app.use('/api/get-params', paramsRoutes()); // написать проверку авторизации
// app.use('/main', isAuthenticated, protectedRouter(io));
// app.use('/api/user-settings', isAuthenticated, settingsControlRoutes());
httpServer.listen(4445, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('db started');
    swaggerDocs(app, 4445);
    console.log('Server started');
  } catch (e) {
    console.log(e, 'not started');
  }
});
