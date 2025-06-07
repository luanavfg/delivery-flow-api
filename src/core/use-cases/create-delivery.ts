import { IDeliveryEntity } from "../../core/entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../core/repositories/delivery-database-repository";

export class CreateDeliveryUseCase {
  constructor(private deliveryDatabaseRepository: DeliveryDatabaseRepository) {}

  async execute(data: Omit<IDeliveryEntity, 'id' | 'createdAt'>): Promise<IDeliveryEntity> {
    return this.deliveryDatabaseRepository.create(data);
  }
}
