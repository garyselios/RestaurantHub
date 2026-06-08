const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Cuisine name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cuisine', cuisineSchema);