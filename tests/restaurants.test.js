const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Restaurants Endpoints', () => {

  test('GET /restaurants should return status 200', async () => {
    const response = await request(app).get('/restaurants');
    expect(response.statusCode).toBe(200);
  });

  test('GET /restaurants should return JSON', async () => {
    const response = await request(app).get('/restaurants');
    expect(response.headers['content-type']).toMatch(/json/);
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});