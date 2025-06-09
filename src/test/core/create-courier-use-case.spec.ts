import { CourierDatabaseRepository } from "../../core/repositories/courier-database-repository";
import { InMemoryCourierDatabaseRepository } from "../../core/repositories/in-memory-courier-database-repository";
import { CreateCourierUseCase } from "../../core/use-cases/courier/create-courier";

describe('CreateCourierUseCase', () => {

  let courierDatabaseRepository: CourierDatabaseRepository
  let createCourierUseCase: CreateCourierUseCase

  beforeEach(() => {
    courierDatabaseRepository = new InMemoryCourierDatabaseRepository();
    createCourierUseCase = new CreateCourierUseCase(courierDatabaseRepository);
  })

  it('should create a courier successfully', async () => {
    const result = await createCourierUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
    });

    expect(result).toHaveProperty('id');
    expect(result.name).toBe('John Doe');
  });

  it('should not allow duplicate email', async () => {
    await createCourierUseCase.execute({
      name: 'First User',
      email: 'duplicate@example.com'
    });

    await expect(
      createCourierUseCase.execute({
        name: 'Second User',
        email: 'duplicate@example.com'
      })
    ).rejects.toThrow('This email is already in use.');
  });
});