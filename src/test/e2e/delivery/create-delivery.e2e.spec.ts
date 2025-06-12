import request from 'supertest';
import { CourierDatabaseRepository } from '../../../core/repositories/courier-database-repository';
import { app } from '../../../main/server';
import { PrismaCourierRepository } from '../../../adapters/database/prisma/repositories/prisma-courier-repository';
import { faker } from '@faker-js/faker/.';

describe('Create Delivery (e2e)', () => {
  let courierId: string;
  let courierDatabaseRepository: CourierDatabaseRepository;

  beforeEach(async () => {
    courierDatabaseRepository = new PrismaCourierRepository();
    await courierDatabaseRepository.deleteAll();
  });

  it('should create a delivery successfully', async () => {
    const courier = await courierDatabaseRepository.create({
      email: 'courier@test.com',
      name: 'Courier Test',
      updatedAt: null
    });

    courierId = courier.id;

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
      // missing destinyAddress, courierId and status
    });

    expect(response.status).toBe(400);
  });

  it('should return 404 if courier does not exist', async () => {
    const response = await request(app).post('/deliveries').send({
      item: 'Box C',
      destinyAddress: '789 Y',
      courierId: faker.string.uuid(),
      status: 'COMPLETED'
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/courier not found/i);
  });
});
