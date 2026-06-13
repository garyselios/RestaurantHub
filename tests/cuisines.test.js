const request = require('supertest');
const app = require('../server');

describe('Cuisines Endpoints', () => {

  test('GET /cuisines should return status 200', async () => {
    const response = await request(app).get('/cuisines');

    expect(response.statusCode).toBe(200);
  });

  test('GET /cuisines should return JSON', async () => {
    const response = await request(app).get('/cuisines');

    expect(response.headers['content-type'])
      .toMatch(/json/);
  });

});