const Review = require('../models/Review');

const handleError = (res, err, code = 500) => res.status(code).json({ message: err.message || err });

// GET all
const getAll = async (req, res) => {
  try {
    const reviews = await Review.find().populate('restaurantId', 'name');
    res.json(reviews);
  } catch (err) { handleError(res, err); }
};

// GET one by ID
const getOne = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('restaurantId', 'name');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) { handleError(res, err); }
};

// POST (crear)
const create = async (req, res) => {
  try {
    const { restaurantId, userId, rating, comment } = req.body;
    if (!restaurantId || !userId || !rating || !comment) {
      return res.status(400).json({ message: 'Missing required fields: restaurantId, userId, rating, comment' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const newReview = new Review({ restaurantId, userId, rating, comment });
    const saved = await newReview.save();
    res.status(201).json({ id: saved._id, message: 'Review created' });
  } catch (err) { handleError(res, err); }
};

// PUT (actualizar)
const update = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const updated = await Review.findByIdAndUpdate(req.params.id, { rating, comment }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review updated' });
  } catch (err) { handleError(res, err); }
};

// DELETE
const remove = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) { handleError(res, err); }
};

module.exports = { getAll, getOne, create, update, delete: remove };