const router = require('express').Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/cuisineController');
const { protect, authorize } = require('../middleware/auth'); // optional protect

// Validation
const cuisineValidation = [
  body('name').notEmpty().withMessage('Name required'),
  body('description').optional().isString(),
];

// Public GET
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

// Protected POST, PUT, DELETE (only admin or authenticated)
router.post('/', protect, authorize('admin'), cuisineValidation, ctrl.create);
router.put('/:id', protect, authorize('admin'), cuisineValidation, ctrl.update);
router.delete('/:id', protect, authorize('admin'), ctrl.delete);

module.exports = router;