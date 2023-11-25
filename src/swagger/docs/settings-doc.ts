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
 *         success:
 *           type: boolean
 *         token:
 *           type: string
 *         data:
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
 *               uniqueItems: true
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
 *             typeUser:
 *               type: array
 *               items:
 *                 type: integer
 */

/**
 * @swagger
 * /api/settings/search-service:
 *   get:
 *     tags: [Settings]
 *     summary: получение данных пользователя
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: успешный запрос
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSearchServiceSettingsResponse'
 *       404:
 *         description: Документ не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Успешность запроса
 *                 message:
 *                   type: string
 *                   description: Документ не найден
 *               example:
 *                 success: false
 *                 message: Документ не найден.
 *       500:
 *         description: Внутренняя ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Успешность запроса
 *                 message:
 *                   type: string
 *                   description: Внутренняя ошибка сервера
 *               example:
 *                 success: false
 *                 message: Внутренняя ошибка сервера.
 */

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
 *           description: список услуг пользователя
 *         additionalServices:
 *           type: array
 *           items:
 *             type: string
 *           description: список дополнительных услуг пользователя
 *         address:
 *           type: array
 *           items:
 *             type: string
 *           description: адреса пользователя
 *         whatsapp:
 *           type: string
 *           description: номер WhatsApp пользователя
 *         telegram:
 *           type: string
 *           description: ник Telegram пользователя
 */


/**
 * @swagger
 * /api/settings/search-service:
 *   post:
 *     tags: [Settings]
 *     summary: добавление данных пользователя
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Токен авторизации пользователя
 *         type: string
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
 *             example:
 *               success: true
 *       404:
 *         description: Ошибка при сохранении настроек пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Успешность запроса
 *                 message:
 *                   type: string
 *                   description: Ошибка при сохранении настроек пользователя.
 *               example:
 *                 success: false
 *                 message: Ошибка при сохранении настроек пользователя.
 *       500:
 *         description: Внутренняя ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Успешность запроса
 *                 message:
 *                   type: string
 *                   description: Внутренняя ошибка сервера
 *               example:
 *                 success: false
 *                 message: Внутренняя ошибка сервера.
 */


