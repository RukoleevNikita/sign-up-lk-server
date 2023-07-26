import express from 'express';
import { authenticationController } from '../controllers/index.js';

const authenticationRoutes = (deleteOne: any, findOne: any) => {
  const authenticationRoutes = express.Router();
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
   * 'api/authorization-control/check':
   *  get:
   *     tags: [Authorization control]
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
   *              $ref: '#/components/schemas/Authorization control'
   *       404:
   *         description: Не удалось проверить авторизацию пользователя
   */

  authenticationRoutes.get('/check', (req, res) => authenticationController.checkAuthentication(req, res, findOne));

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
   *         success: true
   */

  /**
   * @openapi
   * 'api/authorization-control/delete':
   *  delete:
   *     tags: [Authorization control]
   *     summary: запросна удаление авторизации
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
   *     responses:
   *       200:
   *         description: success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Delete session'
   *       404:
   *         description: Сессии с таким id не существует
   */
  // delete переименовать в logout
  authenticationRoutes.delete('/delete', (req, res) =>
    authenticationController.deleteAuthentication(req, res, deleteOne)
  );
  // /**
  //  * @swagger
  //  * components:
  //  *   schemas:
  //  *     Set session:
  //  *       type: object
  //  *       properties:
  //  *         success:
  //  *           type: boolean
  //  *       example:
  //  *         success: true
  // */
  // /**
  //  * @openapi
  //  * 'api/authorization-control/set-session':
  //  *  delete:
  //  *     tags: [Authorization control]
  //  *     summary: запросна удаление авторизации
  //  *     requestBody:
  //  *       required: true
  //  *       content:
  //  *        application/json:
  //  *          schema:
  //  *           type: object
  //  *           properties:
  //  *             id:
  //  *               type: string
  //  *           required:
  //  *             - id
  //  *     responses:
  //  *       200:
  //  *         description: success
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/Set session'
  //  *       404:
  //  *         description: Сессии с таким id не существует
  // authorizationControlRoutes.get('set-session', (req, res) => userController.setSession(req, res, deleteOne));
  return authenticationRoutes;
};

export default authenticationRoutes;
