// import { InMemoryCourierDatabaseRepository } from "../../core/repositories/in-memory-courier-database-repository";
// import { CreateCourierUseCase } from "../../core/use-cases/courier/create-courier";

// describe('CreateCourierUseCase', () => {
//   it('should create a courier successfully', async () => {
//     const repository = new InMemoryCourierDatabaseRepository();
//     const useCase = new CreateCourierUseCase(repository);

//     const result = await useCase.execute({
//       name: 'John Doe',
//       email: 'john@example.com',
//     });

//     expect(result).toHaveProperty('id');
//     expect(result.name).toBe('John Doe');
//   });

//   it('should not allow duplicate email', async () => {
//     const repository = new InMemoryCourierRepository();
//     const useCase = new CreateCourierUseCase(repository);

//     await useCase.execute({
//       name: 'First User',
//       email: 'duplicate@example.com'
//     });

//     await expect(
//       useCase.execute({
//         name: 'Second User',
//         email: 'duplicate@example.com'
//       })
//     ).rejects.toThrow('Courier with this email already exists.');
//   });
// });