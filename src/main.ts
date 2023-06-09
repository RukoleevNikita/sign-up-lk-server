import express, { Express, Response, Request, ErrorRequestHandler } from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
// import redis from 'redis';
import authenticationRoutes from './routes/authenticationRoutes.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
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
app.use(express.json());
app.use(cors({ origin: '*' }));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => res.send(200));

app.use('/authentication', authenticationRoutes(io));

const errorHandler: ErrorRequestHandler = (error: Error, req, res, next) => {
  console.error('Ошибка запуска сервера:', error);
  res.status(500).json({ error: 'Server does not  started' });
};
app.use(errorHandler);
httpServer.listen(4445, () => {
  console.log('Server started');
});
