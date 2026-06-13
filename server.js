require('dotenv').config();
console.log('CLIENT ID:', process.env.GOOGLE_CLIENT_ID);
console.log('CALLBACK:', process.env.GOOGLE_CALLBACK_URL);
const express = require('express');
const cors = require('cors');
const session = require('express-session');       
const passport = require('passport');              
const connectDB = require('./config/db');
const setupSwagger = require('./swagger');

// Import routes
const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const cuisineRoutes = require('./routes/cuisines');
const authRoutes = require('./routes/auth');      

// Passport config (must be after importing routes and models)
require('./config/passport')(passport);            

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Session middleware (required for Passport) - MUST be before Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/restaurants', restaurantRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);
app.use('/cuisines', cuisineRoutes);
app.use('/auth', authRoutes);                   

// Test route
app.get('/', (req, res) => {
  res.send('RestaurantHub API is running. Use /restaurants, /reviews, /users, /cuisines, or /auth/google.');
});

// Setup Swagger (after routes)
setupSwagger(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Restaurants: http://localhost:${PORT}/restaurants`);
    console.log(`Reviews: http://localhost:${PORT}/reviews`);
    console.log(`Users: http://localhost:${PORT}/users`);
    console.log(`Cuisines: http://localhost:${PORT}/cuisines`);
    console.log(`Auth: http://localhost:${PORT}/auth/google`);
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;