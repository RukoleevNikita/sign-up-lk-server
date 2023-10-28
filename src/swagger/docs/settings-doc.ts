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
 *         userId:
 *           type: string
 *           description: id пользователя
 *       required:
 *         - userId
 */

/**
 * @swagger
 * /api/settings/search-service:
 *   get:
 *     tags: [Settings]
 *     summary: получение данных пользователя по ID
 *     parameters:
 *       - in: query
 *         name: userId
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
 *         description: Пользователь с указанным id не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Успешность запроса
 *               example:
 *                 success: false
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
 *         userId:
 *           type: string
 *           description: id пользователя
 *         searchServiceUserData:
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
 *         - userId
 *         - searchServiceUserData
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
 *         description: Не удалось добавить данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Успешность запроса
 *               example:
 *                 success: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserDataRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: id пользователя
 *         searchServiceUserData:
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
 *         - userId
 *         - searchServiceUserData
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