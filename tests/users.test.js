const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Users Endpoints', () => {

  test('GET user route should not return server error', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).not.toBe(500);
  });

  test('Users route should respond', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).toBeLessThan(500);
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});