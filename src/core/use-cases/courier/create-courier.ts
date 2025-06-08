import { ICourierEntity } from "../../entities/courier/types";
import { CourierDatabaseRepository } from "../../repositories/courier-database-repository";
import { EmailConflictError } from "../../errors/email-conflict-error";

export class CreateCourierUseCase {
  constructor(private courierDatabaseRepository: CourierDatabaseRepository) {}

  async execute(data: Omit<ICourierEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ICourierEntity> {
    const { email } = data

    const emailInDatabase = await this.courierDatabaseRepository.findByEmail(email)

    if (emailInDatabase) {
      throw new EmailConflictError()
    }
    
    return this.courierDatabaseRepository.create(data);
  }
}
