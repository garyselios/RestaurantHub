
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine type is required'],
      enum: ['Italian', 'Mexican', 'Japanese', 'Chinese', 'Indian', 'American', 'Other'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    phone: {
      type: String,
      match: [/^\d{10,15}$/, 'Invalid phone number (10-15 digits)'],
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/300',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  {
    timestamps: true, 
  }
);


restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);