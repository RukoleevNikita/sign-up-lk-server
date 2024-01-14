/**
 * @swagger
 * tags:
 *   name: Request for specialization parameters
 *   description: запрос параметров при выборе специализации
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceItem:
 *       type: object
 *       properties:
 *         service:
 *           type: string
 *           description: название специализации
 *           example: 'Маникюр'
 *         basicService:
 *           type: string
 *           description: название базовой услуги маникюра
 *           example: 'Маникюр c покрытием гель лаком'
 *         additionalServices:
 *           type: array
 *           description: дополнительный перечень услуг маникюра
 *           items:
 *             type: string
 *           example:
 *             - 'Аппаратный маникюр'
 *             - 'Классический маникюр'
 *             - 'Японский маникюр'
 *             - 'Пилочный маникюр'
 *             - 'Комбинированный маникюр'
 *             - 'Мужской маникюр'
 *             - 'Наращивание ногтей'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SpecializationParametersResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: array
 *           description: массив объектов с данными о маникюре.
 *           items:
 *             $ref: '#/components/schemas/ServiceItem'
 *       example:
 *         msg:
 *           - service: 'Маникюр'
 *             basicService: 'Маникюр c покрытием гель лаком'
 *             additionalServices:
 *               - 'Аппаратный маникюр'
 *               - 'Классический маникюр'
 *               - 'Японский маникюр'
 *               - 'Пилочный маникюр'
 *               - 'Комбинированный маникюр'
 *               - 'Мужской маникюр'
 *               - 'Наращивание ногтей'
 */

/**
 * @openapi
 * /api/get-params:
 *   get:
 *     tags: [Request for specialization parameters]
 *     summary: получить параметры при выборе специализации
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             params:
 *               type: array
 *               items:
 *                 type: integer
 *                 enum: [0, 1, 2]
 *           example:
 *             params: [0, 1, 2]
 *     responses:
 *       200:
 *         description: успешный запрос
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpecializationParametersResponse'
 *       404:
 *         description: не удалось получить параметры
 */