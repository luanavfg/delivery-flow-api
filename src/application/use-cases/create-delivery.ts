import { IDeliveryEntity } from "../../domain/entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../domain/repositories/delivery-database-repository";

export class CreateDeliveryUseCase {
  constructor(private deliveryDatabaseRepository: DeliveryDatabaseRepository) {}

  async execute(data: Omit<IDeliveryEntity, 'id' | 'createdAt'>): Promise<IDeliveryEntity> {
    return this.deliveryDatabaseRepository.create(data);
  }
}
