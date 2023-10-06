import express from 'express';
import { authentication } from '../controllers/index.js';
import { IMongoDBManager } from '../service/index.js';

const authenticationRoutes = (dbManager: IMongoDBManager) => {
  const authenticationRoutes = express.Router();

  authenticationRoutes.post('/send-message', (req, res) => authentication.sendCode(req, res, dbManager));
  authenticationRoutes.post('/check-message', (req, res) => authentication.checkCode(req, res, dbManager));
  authenticationRoutes.get('/', (req, res) => authentication.checkAuthentication(req, res, dbManager));
  authenticationRoutes.delete('/', (req, res) => authentication.deleteAuthentication(req, res, dbManager));

  return authenticationRoutes;
};

export default authenticationRoutes;

