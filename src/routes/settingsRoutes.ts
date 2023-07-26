import express from 'express';
import { authenticationController } from '../controllers/index.js';

const settingsControlRoutes = (deleteOne: any, findOne: any) => {
  const settingsControlRoutes = express.Router();
  /**
   * @swagger
   * components:
   *   schemas:
   *     User settings:
   *       type: object
   *       properties:
   *         success:
   *           type: boolean
   *         msg:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               description: id польтзователя
   *             token:
   *               type: string
   *               description: token пользователя
   *       example:
   *          succes: true,
   *          msg:
   *            id: '64b299cb140266a6294d2c4e'
   *            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUyMDgsImlhdCI6MTY4OTQyNjM3OSwiZXhwIjoxNjkyMDE4Mzc5f'
   */

  /**
   * @swagger
   * tags:
   *   name: Settings control
   *   description: управление настройками пользователя
   */

  /**
   * @openapi
   * 'api/user-settings':
   *  post:
   *     tags: [Settings control]
   *     summary: запрос к бд для проверки авторизации
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *           required:
   *             - id
   *        description: id пользователя
   *     responses:
   *       200:
   *         description: success
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User settings'
   *       404:
   *         description: Не удалось проверить авторизацию пользователя
   */

  // settingsControlRoutes.post('/check', (req, res) => userController.checkAuthorization(req, res, findOne));

  return settingsControlRoutes;
};

export default settingsControlRoutes;
