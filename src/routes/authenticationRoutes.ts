import express from 'express';
import { authenticationController } from '../controllers/index.js';
import { IMongoDBManager } from '../service/index.js';

const authenticationRoutes = (dbManager: IMongoDBManager) => {
  const authenticationRoutes = express.Router();

  authenticationRoutes.post('/send-message', (req, res) => authenticationController.authentication.sendCode(req, res, dbManager));
  authenticationRoutes.post('/check-message', (req, res) => authenticationController.authentication.checkCode(req, res, dbManager));
  authenticationRoutes.get('/', (req, res) => authenticationController.authentication.checkAuthentication(req, res, dbManager));
  authenticationRoutes.delete('/', (req, res) => authenticationController.authentication.deleteAuthentication(req, res, dbManager));

  return authenticationRoutes;
};

export default authenticationRoutes;

