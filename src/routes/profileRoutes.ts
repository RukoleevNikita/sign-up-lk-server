import express from 'express';
import { profileController } from '../controllers/index.js';

const profileRoutes = (findOne: any) => {
  /**
   * @swagger
   * tags:
   *   name: Profile
   *   description: данные пользователя
   */
  /**
   * @swagger
   * components:
   *   schemas:
   *     Settings:
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
   *             phoneNumber:
   *               type: string
   *               description: телефон пользователя
   *             createdAt:
   *               type: Date
   *               description: дата создания аккаунта
   *             firstName:
   *               type: string
   *               description: имя пользователя
   *             lastName:
   *               type: string
   *               description: фамилия пользователя
   *             patronymic:
   *               type: string
   *               description: отчество пользователя
   *             mail:
   *               type: string
   *               description: почта
   *             typeUser:
   *               type: array
   *               items:
   *                 type: integer
   *               description: тип пользователя [0 - маникюр, 1 - бровист...]
   *             address:
   *               type: string
   *               description: адрес офиса (где работает)
   *       example:
   *          succes: true,
   *          msg:
   *            id: '64b299cb140266a6294d2c4e'
   *            phoneNumber: '79618833812'
   *            createdAt: '2023-08-15T13:16:29.442Z'
   *            firstName: 'Светлана'
   *            lastName: 'Сергеева'
   *            patronymic: 'Сергеевна'
   *            mail: 'serg@mail.com'
   *            typeUser: '[0]'
   *            address: 'Бульвар архтекторов 2/1'
   */

  const profileRoutes = express.Router();

  /**
   * @swagger
   * components:
   *   schemas:
   *     Profile:
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
   *             phoneNumber:
   *               type: string
   *               description: телефон пользователя
   *             createdAt:
   *               type: Date
   *               description: дата создания аккаунта
   *             firstName:
   *               type: string
   *               description: имя пользователя
   *             lastName:
   *               type: string
   *               description: фамилия пользователя
   *             patronymic:
   *               type: string
   *               description: отчество пользователя
   *             mail:
   *               type: string
   *               description: почта
   *             typeUser:
   *               type: array
   *               items:
   *                 type: integer
   *               description: тип пользователя [0 - маникюр, 1 - бровист...]
   *             address:
   *               type: string
   *               description: адрес офиса (где работает)
   *       example:
   *          succes: true,
   *          msg:
   *            id: '64b299cb140266a6294d2c4e'
   *            phoneNumber: '79618833812'
   *            createdAt: '2023-08-15T13:16:29.442Z'
   *            firstName: 'Светлана'
   *            lastName: 'Сергеева'
   *            patronymic: 'Сергеевна'
   *            mail: 'serg@mail.com'
   *            typeUser: '[0]'
   *            address: 'Бульвар архтекторов 2/1'
   */
  /**
   * @openapi
   * 'api/profile':
   *  get:
   *     tags: [Profile]
   *     summary: получение данных пользователя
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
   *              $ref: '#/components/schemas/Profile'
   *       404:
   *         description: Не удалось проверить авторизацию пользователя
   */

  profileRoutes.get('/', (req, res) => profileController.profile(req, res, findOne));

  /**
   * @openapi
   * 'api/profile/settings':
   *  post:
   *     tags: [Profile]
   *     summary: изменение данных пользователя
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
   *              $ref: '#/components/schemas/Settings'
   *       404:
   *         description: Не удалось проверить авторизацию пользователя
   */
  profileRoutes.post('/settings', (req, res) => profileController.profileSettings(req, res, findOne));

  return profileRoutes;
};

export default profileRoutes;
