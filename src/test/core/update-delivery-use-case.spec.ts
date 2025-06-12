import { CourierDatabaseRepository } from "../../core/repositories/courier-database-repository";
import { DeliveryDatabaseRepository } from "../../core/repositories/delivery-database-repository";
import { InMemoryCourierDatabaseRepository } from "../../core/repositories/in-memory-courier-database-repository";
import { InMemoryDeliveryDatabaseRepository } from "../../core/repositories/in-memory-delivery-database-repository";
import { UpdateDeliveryUseCase } from "../../core/use-cases/delivery/update-delivery";
import { NotFoundError } from "../../core/errors/not-found-error";
import { ValidationError } from "../../core/errors/validation-error";
import { faker } from "@faker-js/faker/.";

describe('UpdateDeliveryUseCase', () => {
  let deliveryDatabaseRepository: DeliveryDatabaseRepository;
  let courierDatabaseRepository: CourierDatabaseRepository;
  let updateDeliveryUseCase: UpdateDeliveryUseCase;
  let deliveryId: string;
  let courierId: string;

  beforeEach(async () => {
    deliveryDatabaseRepository = new InMemoryDeliveryDatabaseRepository();
    courierDatabaseRepository = new InMemoryCourierDatabaseRepository();
    updateDeliveryUseCase = new UpdateDeliveryUseCase(deliveryDatabaseRepository, courierDatabaseRepository);

    const courier = await courierDatabaseRepository.create({
      email: 'fake-email@example.com',
      name: 'fake courier',
      updatedAt: null
    });
    courierId = courier.id;

    const delivery = await deliveryDatabaseRepository.create({
      item: 'Package A',
      destinyAddress: '123 Main St',
      courierId,
      status: 'PENDING',
      updatedAt: null
    });
    deliveryId = delivery.id;
  });

  it('should update a delivery successfully', async () => {
    const result = await updateDeliveryUseCase.execute({
      id: deliveryId,
      destinyAddress: '456 New St',
      status: 'IN_PROGRESS'
    });

    expect(result).toHaveProperty('id', deliveryId);
    expect(result.destinyAddress).toBe('456 New St');
    expect(result.status).toBe('IN_PROGRESS');
    expect(result.courierId).toBe(courierId);
    expect(result).toHaveProperty('updatedAt');
  });

  it('should throw NotFoundError if delivery does not exist', async () => {
    await expect(
      updateDeliveryUseCase.execute({
        id: faker.string.uuid(),
        destinyAddress: '456 New St'
      })
    ).rejects.toThrow(NotFoundError);

    await expect(
      updateDeliveryUseCase.execute({
        id: faker.string.uuid(),
        destinyAddress: '456 New St'
      })
    ).rejects.toThrow('Cannot find delivery in database.');
  });

  it('should throw ValidationError if trying to update a canceled delivery', async () => {
    const canceledDelivery = await deliveryDatabaseRepository.create({
      item: 'Canceled Package',
      destinyAddress: '789 Cancel St',
      courierId,
      status: 'CANCELED',
      updatedAt: null
    });

    await expect(
      updateDeliveryUseCase.execute({
        id: canceledDelivery.id,
        destinyAddress: '456 New St'
      })
    ).rejects.toThrow(ValidationError);

    await expect(
      updateDeliveryUseCase.execute({
        id: canceledDelivery.id,
        destinyAddress: '456 New St'
      })
    ).rejects.toThrow('Cannot edit a canceled delivery.');
  });

  it('should throw NotFoundError if courier does not exist when updating courierId', async () => {
    await expect(
      updateDeliveryUseCase.execute({
        id: deliveryId,
        courierId: faker.string.uuid()
      })
    ).rejects.toThrow(NotFoundError);

    await expect(
      updateDeliveryUseCase.execute({
        id: deliveryId,
        courierId: faker.string.uuid()
      })
    ).rejects.toThrow('Courier not found.');
  });

  it('should update courier in delivery successfully when providing valid courierId', async () => {
    const newCourier = await courierDatabaseRepository.create({
      email: 'new-courier@example.com',
      name: 'new courier',
      updatedAt: null
    });

    const result = await updateDeliveryUseCase.execute({
      id: deliveryId,
      courierId: newCourier.id
    });

    expect(result).toHaveProperty('id', deliveryId);
    expect(result.courierId).toBe(newCourier.id);
  });

  it('should maintain unchanged fields when updating only some properties', async () => {
    const originalDelivery = await deliveryDatabaseRepository.findById(deliveryId);
    
    const result = await updateDeliveryUseCase.execute({
      id: deliveryId,
      status: 'COMPLETED'
    });

    expect(result).toHaveProperty('id', deliveryId);
    expect(result.status).toBe('COMPLETED');
    expect(result.destinyAddress).toBe(originalDelivery?.destinyAddress);
    expect(result.courierId).toBe(originalDelivery?.courierId);
    expect(result.item).toBe(originalDelivery?.item);
  });
});
