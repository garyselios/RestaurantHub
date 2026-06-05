/**
 * @openapi
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         cuisine:
 *           type: string
 *           enum: [Italian, Mexican, Japanese, Chinese, Indian, American, Other]
 *         phone:
 *           type: string
 *         rating:
 *           type: number
 *         imageUrl:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RestaurantInput:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - cuisine
 *       properties:
 *         name:
 *           type: string
 *           example: "..."
 *         address:
 *           type: string
 *           example: "..."
 *         cuisine:
 *           type: string
 *           enum: [Italian, Mexican, Japanese, Chinese, Indian, American, Other]
 *           example: "..."
 *         phone:
 *           type: string
 *           pattern: '^\d{10,15}$'
 *           example: "...."
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           example: ...
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

const router = require('express').Router();
const ctrl = require('../controllers/restaurantController');

/**
 * @openapi
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Server error
 */
router.get('/', ctrl.getAll);

/**
 * @openapi
 * /restaurants/{id}:
 *   get:
 *     summary: Get a single restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */
router.get('/:id', ctrl.getOne);

/**
 * @openapi
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantInput'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', ctrl.create);

/**
 * @openapi
 * /restaurants/{id}:
 *   put:
 *     summary: Update a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantInput'
 *     responses:
 *       200:
 *         description: Restaurant updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Restaurant not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/:id', ctrl.update);

/**
 * @openapi
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       204:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', ctrl.delete);

module.exports = router;