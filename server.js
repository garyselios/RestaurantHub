require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/restaurants', restaurantRoutes);
app.use('/reviews', reviewRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('RestaurantHub API is running. Use /restaurants or /reviews.');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Restaurants: http://localhost:${PORT}/restaurants`);
  console.log(`Reviews: http://localhost:${PORT}/reviews`);
});