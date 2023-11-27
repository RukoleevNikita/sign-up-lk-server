import { Request, Response, Router } from 'express';
import { calendarController } from '../controllers/index.js';

const calendarRoutes = () => {
  const calendarRoutes = Router();

  calendarRoutes.get('/', (req: Request, res: Response) =>
    calendarController.getCalendarData(req, res)
  );
  calendarRoutes.post('/', (req: Request, res: Response) =>
    calendarController.saveSearchServiceSettings(req, res)
  );
  return calendarRoutes;
};

export default calendarRoutes;