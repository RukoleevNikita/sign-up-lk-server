import { Router, Response, Request } from 'express';
import { paramsControllers } from '../controllers/index';

const paramsRoutes = () => {
  const paramsRoutes = Router();

  paramsRoutes.get('/', (req: Request, res: Response) => paramsControllers.getListServices(req, res));

  return paramsRoutes;
};

export default paramsRoutes;
