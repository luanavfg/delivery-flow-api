import request from 'supertest';
import { CourierDatabaseRepository } from '../../../core/repositories/courier-database-repository';
import { InMemoryCourierDatabaseRepository } from '../../../core/repositories/in-memory-courier-database-repository';
import { app } from '../../../main/server';

// IN PROGRESS
describe('Create Delivery (e2e)', () => {
  let courierId: string;
  let courierDatabaseRepository: CourierDatabaseRepository;

  beforeAll(async () => {
    courierDatabaseRepository = new InMemoryCourierDatabaseRepository();

    const courier = await courierDatabaseRepository.create({
      email: 'courier@test.com',
      name: 'Courier Test',
      updatedAt: null
    });

    courierId = courier.id;
  });

  it('should create a delivery successfully', async () => {
    const response = await request(app).post('/deliveries').send({
      item: 'Box A',
      destinyAddress: '456 Final Ave',
      courierId,
      status: 'COMPLETED'
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.item).toBe('Box A');
    expect(response.body.status).toBe('COMPLETED');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/deliveries').send({
      item: 'Box B',
      // missing destinyAddress, courierId
    });

    expect(response.status).toBe(400);
  });

  it('should return 404 if courier does not exist', async () => {
    const response = await request(app).post('/deliveries').send({
      item: 'Box C',
      destinyAddress: '789 Y',
      courierId: 'non-existent-id',
      status: 'COMPLETED'
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/courier not found/i);
  });
});
