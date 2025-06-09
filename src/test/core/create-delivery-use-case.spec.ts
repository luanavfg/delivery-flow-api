import { CourierDatabaseRepository } from "../../core/repositories/courier-database-repository";
import { DeliveryDatabaseRepository } from "../../core/repositories/delivery-database-repository";
import { InMemoryCourierDatabaseRepository } from "../../core/repositories/in-memory-courier-database-repository";
import { InMemoryDeliveryDatabaseRepository } from "../../core/repositories/in-memory-delivery-database-repository";
import { CreateDeliveryUseCase } from "../../core/use-cases/delivery/create-delivery";

describe('CreateDeliveryUseCase', () => {
  let deliveryDatabaseRepository: DeliveryDatabaseRepository;
  let courierDatabaseRepository: CourierDatabaseRepository;
  let createDeliveryUseCase: CreateDeliveryUseCase;

  beforeEach(() => {
    deliveryDatabaseRepository = new InMemoryDeliveryDatabaseRepository();
    courierDatabaseRepository = new InMemoryCourierDatabaseRepository();
    createDeliveryUseCase = new CreateDeliveryUseCase(deliveryDatabaseRepository, courierDatabaseRepository);
  });

  it('should create a delivery successfully', async () => {
    const courier = await courierDatabaseRepository.create({
      email: 'fake-email@example.com',
      name: 'fake courier',
      updatedAt: null
    })

    const result = await createDeliveryUseCase.execute({
      courierId: courier.id,
      item: 'Package A',
      destinyAddress: '123 Main St',
      status: 'IN_PROGRESS'
    });

    expect(result).toHaveProperty('id');
    expect(result.item).toBe('Package A');
    expect(result.status).toBe('IN_PROGRESS');
  });

  it('should not create a delivery successfully if courier does not exist', async () => {
    await expect(
      createDeliveryUseCase.execute({
        courierId: 'fake-unexistent-id',
        item: 'Package B',
        destinyAddress: '456 Main St',
        status: 'PENDING'
      })
    ).rejects.toThrow('Courier not found.');
  });
});
