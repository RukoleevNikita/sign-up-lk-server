import express from 'express';
import { searchServiceSettingsController } from '../controllers/index.js';

const settingsRoutes = (findOne: any) => {
  const settingsRoutes = express.Router();
  /**
   * @swagger
   * tags:
   *   name: Settings
   *   description: данные пользователя
   */
  /**
   * @swagger
   * components:
   *   schemas:
   *     GetSearchServiceSettingsResponse:
   *       type: object
   *       properties:
   *         activeAccount:
   *           type: boolean
   *           description: активность пользователя в поисковом сервисе
   *         socialNetwork:
   *           type: array
   *           items:
   *             type: string
   *           description: список социальных сетей пользователя
   *         workPhoneNumber:
   *           type: string
   *           description: рабочий номер телефона пользователя
   *         firstName:
   *           type: string
   *           description: имя пользователя
   *         lastName:
   *           type: string
   *           description: фамилия пользователя
   *         userServices:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               service:
   *                 type: string
   *               price:
   *                 type: string
   *             description: список услуг пользователя
   *         additionalServices:
   *           type: array
   *           items:
   *             type: string
   *           description: список дополнительных услуг пользователя
   *         address:
   *           type: array
   *           items:
   *             type: string
   *           description: рабочий адрес
   *         whatsapp:
   *           type: string
   *           description: номер WhatsApp пользователя
   *         telegram:
   *           type: string
   *           description: ник еelegram пользователя
   *     GetSearchServiceSettingsRequest:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *           description: id пользователя
   *       required:
   *         - id
   */

  /**
   * @swagger
   * /api/settings/search-service:
   *   get:
   *     tags: [Settings]
   *     summary: gолучение данных пользователя по ID
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: id пользователя
   *     responses:
   *       200:
   *         description: успешный запрос
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GetSearchServiceSettingsResponse'
   *       404:
   *         description: пользователь с указанным id не найден
   */

  settingsRoutes.get('/search-service', (req, res) =>
    searchServiceSettingsController.getSearchServiceSettings(req, res, findOne)
  );
  // userId: Types.ObjectId;
  // workPhoneNumber: string[]; // рабочий
  // firstName?: string;
  // lastName?: string;
  // userServices?: object[]; объект с названием услоги и ценой [{service: 'Маникюр', price: 4000k}, {service: 'Визажист', price: 3000k}]
  // additionalServices // дополнительный перечень услуг
  // address?: string; // ТОК Флагман 4 этаж офис 422
  // whatsapp?: string; // wa.me/79131465028
  // telegram?: string; // ссылка на тг канал или аккаунт - t.me/v_postnova_nails
  // activeAccount?: boolean;
  // socialNetwork?: string[];
  // фото примеров работ
  /**
   * @swagger
   * components:
   *   schemas:
   *     PostSearchServiceSettingsResponse:
   *       type: object
   *       properties:
   *         success:
   *           type: boolean
   *       example:
   *         success: true
   *     PostSearchServiceSettingsRequest:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *           description: id пользователя
   *         profileData:
   *           type: object
   *           properties:
   *             activeAccount:
   *               type: boolean
   *               description: активность пользователя в поисковом сервисе
   *             socialNetwork:
   *               type: array
   *               items:
   *                 type: string
   *               description: список социальных сетей пользователя
   *             workPhoneNumber:
   *               type: string
   *               description: рабочий номер телефона пользователя
   *             firstName:
   *               type: string
   *               description: имя пользователя
   *             lastName:
   *               type: string
   *               description: фамилия пользователя
   *             userServices:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   service:
   *                     type: string
   *                   price:
   *                     type: string
   *               description: список услуг пользователя
   *             additionalServices:
   *               type: array
   *               items:
   *                 type: string
   *               description: список дополнительных услуг пользователя
   *             address:
   *               type: array
   *               items:
   *                 type: string
   *               description: адреса пользователя
   *             whatsapp:
   *               type: string
   *               description: номер WhatsApp пользователя
   *             telegram:
   *               type: string
   *               description: ник Telegram пользователя
   *       required:
   *         - id
   *         - profileData
   */

  /**
   * @swagger
   * /api/settings/search-service:
   *   post:
   *     tags: [Settings]
   *     summary: добавление данных пользователя
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostSearchServiceSettingsRequest'
   *     responses:
   *       200:
   *         description: успешное добавление данных пользователя
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PostSearchServiceSettingsResponse'
   *       404:
   *         description: не удалось добавить данные пользователя
   */

  // * profileData:
  // * activeAccount: true
  // * socialNetwork: ["instagram/link", "vk/name"]
  // * workPhoneNumber: "89136553626"
  // * firstName: "Никита"
  // * lastName: "Руколеев"
  // * userServices: [{service: 'Маникюр', price: '4000k'}, {service: 'Визажист', price: '3000k'}]
  // * additionalServices: ['Аппаратный маникюр', 'Классический маникюр']
  // * address: ["ТОК Флагман 4 этаж офис 422"]
  // * whatsapp: "wa.me/79131465028"
  // * telegram: "t.me/v_postnova_nails"

  settingsRoutes.post('/search-service', (req, res) =>
    searchServiceSettingsController.saveSearchServiceSettings(req, res, findOne)
  );

  /**
   * @swagger
   * components:
   *   schemas:
   *     UpdateUserDataRequest:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *           description: id пользователя
   *         profileData:
   *           type: object
   *           properties:
   *             activeAccount:
   *               type: boolean
   *             socialNetwork:
   *               type: array
   *               items:
   *                 type: string
   *             workPhoneNumber:
   *               type: string
   *             firstName:
   *               type: string
   *             lastName:
   *               type: string
   *             userServices:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   service:
   *                     type: string
   *                   price:
   *                     type: string
   *             additionalServices:
   *               type: array
   *               items:
   *                 type: string
   *             address:
   *               type: array
   *               items:
   *                 type: string
   *             whatsapp:
   *               type: string
   *             telegram:
   *               type: string
   *       required:
   *         - id
   *         - profileData
   *     UpdateUserDataResponse:
   *       type: object
   *       properties:
   *         success:
   *           type: boolean
   */

  /**
   * @swagger
   * /api/settings/search-service:
   *   put:
   *     tags: [Settings]
   *     summary: обновление данных пользователя
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserDataRequest'
   *     responses:
   *       200:
   *         description: успешное обновление данных
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UpdateUserDataResponse'
   *       404:
   *         description: пользователь с указанным id не найден
   */

  settingsRoutes.put('/search-service', (req, res) =>
    searchServiceSettingsController.updateSearchServiceSettings(req, res, findOne)
  );

  return settingsRoutes;
};

export default settingsRoutes;
