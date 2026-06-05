const Restaurant = require('../models/Restaurant');

const errorRes = (res, err, code = 500) => res.status(code).json({ message: err.message || err });

// GET all
const getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) { errorRes(res, err); }
};

// GET one
const getOne = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Not found' });
    res.json(restaurant);
  } catch (err) { errorRes(res, err); }
};

// POST
const create = async (req, res) => {
  try {
    const { name, address, cuisine } = req.body;
    if (!name || !address || !cuisine) {
      return res.status(400).json({ message: 'Missing required fields: name, address, cuisine' });
    }
    const newRestaurant = new Restaurant(req.body);
    const saved = await newRestaurant.save();
    res.status(201).json({ id: saved._id, message: 'Restaurant created' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    errorRes(res, err);
  }
};

// PUT
const update = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Restaurant updated' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    errorRes(res, err);
  }
};

// DELETE
const remove = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Restaurant deleted' });
  } catch (err) { errorRes(res, err); }
};

module.exports = { getAll, getOne, create, update, delete: remove };