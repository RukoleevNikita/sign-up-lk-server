/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: управление авторизацией клиента
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendMessageCode:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: успешно ли выполнен запрос
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: токен сессии
 *             widgets:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   widgetId:
 *                     type: integer
 *                     description: идентификатор виджета
 *                   active:
 *                     type: boolean
 *                     description: активен ли виджет
 *                   widgetName:
 *                     type: string
 *                     description: название виджета
 *                   _id:
 *                     type: string
 *                     description: идентификатор виджета
 */
/**
 * @swagger
 * /api/authentication/send-message:
 *   post:
 *     tags: [Authentication]
 *     summary: отправка проверочного кода
 *     parameters:
 *       - in: header
 *         name: phone-number
 *         required: true
 *         schema:
 *           type: string
 *         description: номер телефона клиента
 *         examples:
 *           phone-number:
 *             value: '79136553626'
 *     responses:
 *       200:
 *         description: проверочный код успешно отправлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: успешно ли выполнен запрос
 *               example:
 *                 success: true
 *       201:
 *         description: сессия была запущена ранее (данные о запущенной сессии)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendMessageCode'
 *       429:
 *         description: превышен лимит запросов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: успешность запроса
 *                 message:
 *                   type: string
 *                   description: сообщение ошибки
 *               example:
 *                 success: false
 *                 message: Превышен лимит запросов. Пожалуйста, подождите.
 *       404:
 *         description: номер телефона не корректен/произошла ошибка при обработке запроса
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: успешность запроса
 *                 message:
 *                   type: string
 *                   description: сообщение ошибки
 *               example:
 *                 success: false
 *                 message: Номер телефона не корректен.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckMessageCode:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: успешно ли выполнен запрос
 *         message:
 *           type: string
 *           description: сообщение о успешном запросе
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: токен сессии
 *             widgets:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   widgetId:
 *                     type: integer
 *                     description: идентификатор виджета
 *                   active:
 *                     type: boolean
 *                     description: активен ли виджет
 *                   widgetName:
 *                     type: string
 *                     description: название виджета
 *                   _id:
 *                     type: string
 *                     description: идентификатор виджета
 *       example:
 *         success: true,
 *         message: 'Код успешно прошел валидацию.'
 *         data:
 *           token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUyMDgsImlhdCI6MTY4OTQyNjM3OSwiZXhwIjoxNjkyMDE4Mzc5f'
 *           widgets: []
 */
/**
 * @swagger
 * /api/authentication/check-message:
 *   post:
 *     tags: [Authentication]
 *     summary: проверка введенного кода
 *     parameters:
 *       - in: header
 *         name: phone-number
 *         required: true
 *         schema:
 *           type: string
 *         description: номер телефона клиента
 *         examples:
 *           phone-number:
 *             value: '79136553626'
 *       - in: header
 *         name: verification-code
 *         required: true
 *         schema:
 *           type: string
 *         description: введенный код верификации
 *         examples:
 *           verification-code:
 *             value: '1234'
 *     responses:
 *       200:
 *         description: проверочный код успешно отправлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckMessageCode'
 *       422:
 *         description: данные не прошли валидацию
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: успешность запроса
 *                 message:
 *                   type: string
 *                   description: сообщение ошибки
 *               example:
 *                 success: false
 *                 message: Данные не прошли валидацию.
 *       423:
 *         description: введен не верный код
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: успешность запроса
 *                 message:
 *                   type: string
 *                   description: сообщение ошибки
 *               example:
 *                 success: false
 *                 message: Введен не верный код.
 *       429:
 *         description: превышен лимит запросов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: успешность запроса
 *                 message:
 *                   type: string
 *                   description: сообщение ошибки
 *               example:
 *                 success: false
 *                 message: Превышен лимит запросов. Пожалуйста, подождите.
 */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Authentication:
//  *       type: object
//  *       properties:
//  *         success:
//  *           type: boolean
//  *         msg:
//  *           type: object
//  *           properties:
//  *             token:
//  *               type: string
//  *               description: token пользователя
//  *       example:
//  *          success: true
//  *          msg:
//  *            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUyMDgsImlhdCI6MTY4OTQyNjM3OSwiZXhwIjoxNjkyMDE4Mzc5f'
//  */
// /**
//  * @openapi
//  * 'api/authentication/':
//  *  get:
//  *     tags: [Authentication]
//  *     summary: НЕ РЕАЛИЗОВАНО!
//  *     requestBody:
//  *       required: true
//  *       content:
//  *        application/json:
//  *          schema:
//  *           type: object
//  *           properties:
//  *             token:
//  *               type: string
//  *           required:
//  *             - token
//  *        description: token пользователя
//  *     responses:
//  *       200:
//  *         description: success
//  *         content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Authentication'
//  *       404:
//  *         description: Не удалось проверить авторизацию пользователя
//  */

/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteSession:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *       example:
 *         success: true
 */
/**
 * @openapi
 * /api/authentication/:
 *   delete:
 *     tags: [Authentication]
 *     summary: запрос на удаление авторизации
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
 *         description: Успешное удаление
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteSession'
 *       400:
 *         description: не валидный токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: успешность запроса
 *                 message:
 *                   type: string
 *                   description: сообщение ошибки
 *               example:
 *                 success: false
 *                 message: Не валидный токен.
 *       404:
 *         description: сессии не существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: успешность запроса
 *                 message:
 *                   type: string
 *                   description: сообщение ошибки
 *               example:
 *                 success: false
 *                 message: Сессии не существует.
 */