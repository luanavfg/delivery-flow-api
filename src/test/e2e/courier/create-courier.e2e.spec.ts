import request from 'supertest'
import { app } from '../../../main/server';

describe('POST /couriers', () => {
  it('should create a courier successfully', async () => {
    const response = await request(app)
      .post('/couriers')
      .send({
        name: 'Jane Doe',
        email: `jane-${Date.now()}@example.com` // evita duplicidade no teste
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Jane Doe');
  });

  it('should return 400 if data is invalid', async () => {
    const response = await request(app)
      .post('/couriers')
      .send({
        name: '', // empty field
        email: 'invalid-email'
      });

    expect(response.status).toBe(400);
  });

  it('should return 409 if email already exists', async () => {
    await request(app)
      .post('/couriers')
      .send({
        name: 'First Courier',
        email: 'courier@example.com'
      });

    const response = await request(app)
      .post('/couriers')
      .send({
        name: 'Second Courier',
        email: 'courier@example.com' // repeated email
      });

    expect(response.status).toBe(409);
  });
});
