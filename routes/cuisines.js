const router = require('express').Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/cuisineController');
const { protect, authorize } = require('../middleware/auth');

// Validation
const cuisineValidation = [
  body('name').notEmpty().withMessage('Name required'),
  body('description').optional().isString(),
];

/**
 * @openapi
 * /cuisines:
 *   get:
 *     summary: Get all cuisines
 *     tags: [Cuisines]
 *     responses:
 *       200:
 *         description: List of cuisines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cuisine'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', ctrl.getAll);

/**
 * @openapi
 * /cuisines/{id}:
 *   get:
 *     summary: Get a single cuisine by ID
 *     tags: [Cuisines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cuisine ID
 *     responses:
 *       200:
 *         description: Cuisine data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuisine'
 *       404:
 *         description: Cuisine not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
router.get('/:id', ctrl.getOne);

/**
 * @openapi
 * /cuisines:
 *   post:
 *     summary: Create a new cuisine (admin only)
 *     tags: [Cuisines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cuisine created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuisine'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Forbidden (requires admin role)
 *       500:
 *         description: Server error
 */
router.post('/', protect, authorize('admin'), cuisineValidation, ctrl.create);

/**
 * @openapi
 * /cuisines/{id}:
 *   put:
 *     summary: Update a cuisine (admin only)
 *     tags: [Cuisines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cuisine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cuisine updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuisine'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Forbidden (requires admin role)
 *       404:
 *         description: Cuisine not found
 *       500:
 *         description: Server error
 */
router.put('/:id', protect, authorize('admin'), cuisineValidation, ctrl.update);

/**
 * @openapi
 * /cuisines/{id}:
 *   delete:
 *     summary: Delete a cuisine (admin only)
 *     tags: [Cuisines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cuisine ID
 *     responses:
 *       204:
 *         description: Cuisine deleted successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Forbidden (requires admin role)
 *       404:
 *         description: Cuisine not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', protect, authorize('admin'), ctrl.delete);

module.exports = router;