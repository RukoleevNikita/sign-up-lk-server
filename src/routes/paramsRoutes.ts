import express from 'express';
import { paramsControllers } from '../controllers/index.js';

const paramsRoutes = () => {
  const paramsRoutes = express.Router();

  paramsRoutes.get('/', (req, res) => paramsControllers.getListServices(req, res));

  return paramsRoutes;
};

export default paramsRoutes;
