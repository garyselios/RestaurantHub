// tests/api.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

// ==================== RESTAURANTS ====================
describe('GET /restaurants', () => {
  it('should return 200 and an array of restaurants', async () => {
    const res = await request(app)
      .get('/restaurants')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /restaurants/:id', () => {
  it('should return 404 for a non-existent restaurant ID', async () => {
    const fakeId = '507f1f77bcf86cd799439011';

    await request(app)
      .get(`/restaurants/${fakeId}`)
      .expect(404);
  });

  it('should return 500 for an invalid ID format', async () => {
    await request(app)
      .get('/restaurants/123')
      .expect(500);
  });
});

// ==================== REVIEWS ====================
describe('GET /reviews', () => {
  it('should return 200 and an array of reviews', async () => {
    const res = await request(app)
      .get('/reviews')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /reviews/:id', () => {
  it('should return 404 for a non-existent review ID', async () => {
    const fakeId = '507f1f77bcf86cd799439011';

    await request(app)
      .get(`/reviews/${fakeId}`)
      .expect(404);
  });

  it('should return 500 for an invalid review ID format', async () => {
    await request(app)
      .get('/reviews/abc')
      .expect(500);
  });
});

// ==================== USERS ====================
describe('GET /users', () => {
  it('should return 404 because route does not exist', async () => {
    await request(app)
      .get('/users')
      .expect(404);
  });
});

describe('GET /users/:userId', () => {
  it('should return 401 Unauthorized for protected route', async () => {
    const fakeId = '507f1f77bcf86cd799439011';

    await request(app)
      .get(`/users/${fakeId}`)
      .expect(401);
  });

  it('should return 401 for invalid ID because auth runs first', async () => {
    await request(app)
      .get('/users/123')
      .expect(401);
  });
});

// ==================== CUISINES ====================
describe('GET /cuisines', () => {
  it('should return 200 and an array of cuisines', async () => {
    const res = await request(app)
      .get('/cuisines')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /cuisines/:id', () => {
  it('should return 404 for a non-existent cuisine ID', async () => {
    const fakeId = '507f1f77bcf86cd799439011';

    await request(app)
      .get(`/cuisines/${fakeId}`)
      .expect(404);
  });

  it('should return 500 for an invalid cuisine ID format', async () => {
    await request(app)
      .get('/cuisines/abc')
      .expect(500);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});