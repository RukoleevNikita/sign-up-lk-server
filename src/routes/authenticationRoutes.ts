import { Request, Response, Router } from 'express';
import { authentication } from '../controllers/index.js';
import {
  sessionVerificationBeforeAuthenticationMiddleware
} from '../middleware/sessionVerificationBeforeAuthenticationMiddleware.js';

const authenticationRoutes = () => {
  const authenticationRoutes = Router();

  authenticationRoutes.post('/send-message', sessionVerificationBeforeAuthenticationMiddleware(), (req: Request, res: Response) => authentication.sendCode(req, res));
  authenticationRoutes.post('/check-message', (req: Request, res: Response) => authentication.checkCode(req, res));
  // authenticationRoutes.get('/', (req, res) => authentication.checkAuthentication(req, res));
  authenticationRoutes.delete('/', (req: Request, res: Response) => authentication.deleteAuthentication(req, res));

  return authenticationRoutes;
};

export default authenticationRoutes;

