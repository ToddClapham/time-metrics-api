import request from 'supertest';
import app from '../../app';

describe('GET /unknown-route', () => {
  it('should return 404 when route is not found', async () => {
    const response = await request(app)
      .get('/unknown-route')
      .set('Authorization', 'Bearer mysecrettoken'); // Send correct header

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Route not found');
  });
});
