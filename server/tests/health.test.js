import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('API Health Check Endpoint', () => {
  test('GET /api/health should return HTTP 200 with standard health message', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      success: true,
      message: 'Hostel and PG Finder API is running',
    });
  });

  test('GET /api/nonexistent-route should return HTTP 404 with error payload', async () => {
    const response = await request(app)
      .get('/api/nonexistent-route')
      .expect('Content-Type', /json/)
      .expect(404);

    assert.equal(response.status, 404);
    assert.equal(response.body.success, false);
    assert.match(response.body.message, /Resource not found/);
  });
});
