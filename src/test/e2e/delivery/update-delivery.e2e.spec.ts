import request from 'supertest';
import { CourierDatabaseRepository } from '../../../core/repositories/courier-database-repository';
import { DeliveryDatabaseRepository } from '../../../core/repositories/delivery-database-repository';
import { app } from '../../../main/server';
import { PrismaCourierRepository } from '../../../adapters/database/prisma/repositories/prisma-courier-repository';
import { PrismaDeliveryRepository } from '../../../adapters/database/prisma/repositories/prisma-delivery-repository';
import { faker } from '@faker-js/faker/.';

describe('Update Delivery (e2e)', () => {
  let courierId: string;
  let deliveryId: string;
  let courierDatabaseRepository: CourierDatabaseRepository;
  let deliveryDatabaseRepository: DeliveryDatabaseRepository;

  beforeEach(async () => {
    courierDatabaseRepository = new PrismaCourierRepository();
    deliveryDatabaseRepository = new PrismaDeliveryRepository();
  
  });

  it('should update a delivery successfully', async () => {
    const courier = await courierDatabaseRepository.create({
      email: 'courier-02@test.com',
      name: 'Courier Test 02',
      updatedAt: null
    });
    courierId = courier.id;

    const delivery = await deliveryDatabaseRepository.create({
      item: 'Test Item',
      destinyAddress: '123 Test St',
      courierId,
      status: 'PENDING',
      updatedAt: null
    });
    deliveryId = delivery.id;

    const response = await request(app)
      .patch(`/deliveries/${deliveryId}`)
      .send({
        destinyAddress: '456 Updated Ave',
        status: 'IN_PROGRESS'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', deliveryId);
    expect(response.body.destinyAddress).toBe('456 Updated Ave');
    expect(response.body.status).toBe('IN_PROGRESS');
    expect(response.body.courierId).toBe(courierId);
  });

  it('should return 404 if delivery does not exist', async () => {
    const nonExistentId = faker.string.uuid();
    
    const response = await request(app)
      .patch(`/deliveries/${nonExistentId}`)
      .send({
        destinyAddress: '456 Updated Ave',
        status: 'IN_PROGRESS'
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/cannot find delivery/i);
  });

  it('should return 400 if trying to update a canceled delivery', async () => {
    const courier = await courierDatabaseRepository.create({
      email: 'courier@test.com',
      name: 'Courier Test',
      updatedAt: null
    });
    courierId = courier.id;

    const canceledDelivery = await deliveryDatabaseRepository.create({
      item: 'Canceled Item',
      destinyAddress: '789 Cancel St',
      courierId,
      status: 'CANCELED',
      updatedAt: null
    });

    const response = await request(app)
      .patch(`/deliveries/${canceledDelivery.id}`)
      .send({
        destinyAddress: '456 Updated Ave',
        status: 'IN_PROGRESS'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/cannot edit a canceled delivery/i);
  });

  it('should return 404 if courier does not exist when updating courierId', async () => {
    const courier = await courierDatabaseRepository.create({
      email: 'courier-03@test.com',
      name: 'Courier Test 03',
      updatedAt: null
    });
    courierId = courier.id;

    const delivery = await deliveryDatabaseRepository.create({
      item: 'Test Item',
      destinyAddress: '123 Test St',
      courierId,
      status: 'PENDING',
      updatedAt: null
    });
    deliveryId = delivery.id;

    const nonExistentCourierId = faker.string.uuid();
    
    const response = await request(app)
      .patch(`/deliveries/${deliveryId}`)
      .send({
        courierId: nonExistentCourierId
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/courier not found/i);
  });

  it('should update courier successfully when providing valid courierId', async () => {
    const courier = await courierDatabaseRepository.create({
      email: 'courier-05@test.com',
      name: 'Courier Test 05',
      updatedAt: null
    });
    courierId = courier.id;

    const delivery = await deliveryDatabaseRepository.create({
      item: 'Test Item',
      destinyAddress: '123 Test St',
      courierId,
      status: 'PENDING',
      updatedAt: null
    });
    deliveryId = delivery.id;

    const newCourier = await courierDatabaseRepository.create({
      email: 'new-courier@test.com',
      name: 'New Courier',
      updatedAt: null
    });

    const response = await request(app)
      .patch(`/deliveries/${deliveryId}`)
      .send({
        courierId: newCourier.id
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', deliveryId);
    expect(response.body.courierId).toBe(newCourier.id);
  });

  it('should maintain unchanged fields when updating only some properties', async () => {
    const courier = await courierDatabaseRepository.create({
      email: 'fake_courier@test.com',
      name: 'Fake Courier Test',
      updatedAt: null
    });
    courierId = courier.id;

    const delivery = await deliveryDatabaseRepository.create({
      item: 'Test Item',
      destinyAddress: '123 Test St',
      courierId,
      status: 'PENDING',
      updatedAt: null
    });
    deliveryId = delivery.id;

    const originalDelivery = await deliveryDatabaseRepository.findById(deliveryId);
    
    const response = await request(app)
      .patch(`/deliveries/${deliveryId}`)
      .send({
        status: 'COMPLETED'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', deliveryId);
    expect(response.body.status).toBe('COMPLETED');
    expect(response.body.destinyAddress).toBe(originalDelivery?.destinyAddress);
    expect(response.body.courierId).toBe(originalDelivery?.courierId);
    expect(response.body.item).toBe(originalDelivery?.item);
  });
});
