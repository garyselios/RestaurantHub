const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Reviews Endpoints', () => {

  test('GET /reviews should return status 200', async () => {
    const response = await request(app).get('/reviews');
    expect(response.statusCode).toBe(200);
  });

  test('GET /reviews should return JSON', async () => {
    const response = await request(app).get('/reviews');
    expect(response.headers['content-type']).toMatch(/json/);
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});