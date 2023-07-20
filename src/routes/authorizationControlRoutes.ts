import express from 'express';
import { userController } from '../controllers/index.js';

const authorizationControlRoutes = (deleteOne: any, findOne: any) => {
  const authorizationControlRoutes = express.Router();
  /**
   * @swagger
   * components:
   *   schemas:
   *     Authorization control:
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
   *   name: Authorization control
   *   description: проверить авторизован ли пользователь/удалить авторизацию пользователя
   */

  /**
   * @openapi
   * '/authorization-control/check':
   *  get:
   *     tags: [Authorization control]
   *     summary: запрос к бд для проверки авторизации
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        description: id пользователя
   *        required: true
   *     responses:
   *       200:
   *         description: success
   *         content:
   *          application/json:
   *            $ref: '#/components/schemas/Authorization control'
   *       404:
   *         description: Не удалось проверить авторизацию пользователя
   */

  authorizationControlRoutes.get('/check', (req, res) => userController.checkAuthorization(req, res, findOne));

  /**
   * @swagger
   * components:
   *   schemas:
   *     Delete session:
   *       type: object
   *       properties:
   *         success:
   *           type: boolean
   *       example:
   *          succes: true,
   */

  /**
   * @openapi
   * '/authorization-control/check':
   *  delete:
   *     tags: [Authorization control]
   *     summary: запросна удаление авторизации
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        description: id пользователя
   *        required: true
   *     responses:
   *       200:
   *         description: success
   *       404:
   *         description: Сессии с таким id не существует
   */
  authorizationControlRoutes.delete('/delete', (req, res) => userController.deleteAuthorization(req, res, deleteOne));

  return authorizationControlRoutes;
};

export default authorizationControlRoutes;
