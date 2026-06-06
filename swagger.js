// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelTickets API',
      version: '1.0.0',
      description: 'API for managing restaurants and reviews',
    },
    servers: [
  {
    url: 'http://localhost:8080',
    description: 'Development server (local)',
  },
  {
    url: 'https://restauranthub-8ukj.onrender.com/',  
    description: 'Production server (Render)',
  },
],
    components: {
      schemas: {
        Restaurant: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            address: { type: 'string' },
            cuisine: {
              type: 'string',
              enum: ['Italian', 'Mexican', 'Japanese', 'Chinese', 'Indian', 'American', 'Other'],
            },
            rating: { type: 'number', minimum: 0, maximum: 5 },
            phone: { type: 'string' },
            imageUrl: { type: 'string' },
            location: {
              type: 'object',
              properties: {
                type: { type: 'string', enum: ['Point'] },
                coordinates: { type: 'array', items: { type: 'number' } },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Review: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            restaurantId: { type: 'string' },
            userId: { type: 'string' },
            rating: { type: 'number', minimum: 1, maximum: 5 },
            comment: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📚 Swagger docs available at /api-docs');
};

module.exports = setupSwagger;