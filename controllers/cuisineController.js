const Cuisine = require('../models/Cuisine');
const { validationResult } = require('express-validator');

const errorRes = (res, err, code = 500) => res.status(code).json({ message: err.message || err });

// GET all
const getAll = async (req, res) => {
  try {
    const cuisines = await Cuisine.find();
    res.json(cuisines);
  } catch (err) { errorRes(res, err); }
};

// GET one
const getOne = async (req, res) => {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (!cuisine) return res.status(404).json({ message: 'Cuisine not found' });
    res.json(cuisine);
  } catch (err) { errorRes(res, err); }
};

// POST
const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const cuisine = await Cuisine.create(req.body);
    res.status(201).json(cuisine);
  } catch (err) { errorRes(res, err); }
};

// PUT
const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const updated = await Cuisine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Cuisine not found' });
    res.json(updated);
  } catch (err) { errorRes(res, err); }
};

// DELETE
const remove = async (req, res) => {
  try {
    const deleted = await Cuisine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Cuisine not found' });
    res.status(204).send();
  } catch (err) { errorRes(res, err); }
};

module.exports = { getAll, getOne, create, update, delete: remove };