import { IDeliveryEntity } from "../../domain/entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../domain/repositories/delivery-database-repository";

export class UpdateDeliveryUseCase {
  constructor(private deliveryDatabaseRepository: DeliveryDatabaseRepository) {}

  async execute(data: {id: string, status: IDeliveryEntity['status']}): Promise<IDeliveryEntity> {
    const updatedDelivery = this.deliveryDatabaseRepository.update(data);

    return updatedDelivery
  }
}
