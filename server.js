require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const setupSwagger = require('./swagger');

// Import routes
const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const cuisineRoutes = require('./routes/cuisines');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/restaurants', restaurantRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);
app.use('/cuisines', cuisineRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('RestaurantHub API is running. Use /restaurants, /reviews, /users, or /cuisines.');
});

// Setup Swagger (after routes)
setupSwagger(app);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Restaurants: http://localhost:${PORT}/restaurants`);
  console.log(`Reviews: http://localhost:${PORT}/reviews`);
  console.log(`Users: http://localhost:${PORT}/users`);
  console.log(`Cuisines: http://localhost:${PORT}/cuisines`);
  console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
});