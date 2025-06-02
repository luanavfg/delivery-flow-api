import { ICourierEntity } from "../../domain/entities/courier/types";
import { CourierDatabaseRepository } from "../../domain/repositories/courier-database-repository";

export class CreateCourierUseCase {
  constructor(private courierDatabaseRepository: CourierDatabaseRepository) {}

  async execute(data: Omit<ICourierEntity, 'id' | 'createdAt'>): Promise<ICourierEntity> {
    return this.courierDatabaseRepository.create(data);
  }
}
