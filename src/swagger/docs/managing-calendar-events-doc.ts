/**
 * @swagger
 * tags:
 *   name: Managing Calendar Events
 *   description: Управление событиями календаря
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     GetCalendarEventsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: успешно ли выполнен запрос
 *         token:
 *           type: string
 *           description: токен сессии
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               name:
 *                 type: string
 *               service:
 *                 type: array
 *                 items:
 *                   type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               phone_number:
 *                 type: string
 *               notes:
 *                 type: string
 */


/**
 * @swagger
 * /api/calendar:
 *   get:
 *     tags: [Managing Calendar Events]
 *     summary: получение всех событий календаря
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
 *             required: true
 *       - in: query
 *         name: dates
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             array: ['2024-01-01', '2024-01-31']
 *         style: form
 *         explode: false
 *         description: Массив из двух дат, начало периода, конец периода
 *         example: ['2024-01-01', '2024-01-31']
 *     responses:
 *       200:
 *         description: успешный запрос
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCalendarEventsResponse'
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
