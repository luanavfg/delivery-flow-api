import { IDeliveryEntity } from "../../core/entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../core/repositories/delivery-database-repository";

export class UpdateDeliveryUseCase {
  constructor(private deliveryDatabaseRepository: DeliveryDatabaseRepository) {}

  async execute(data: {id: string, status: IDeliveryEntity['status']}): Promise<IDeliveryEntity> {
    const updatedDelivery = this.deliveryDatabaseRepository.update(data);

    return updatedDelivery
  }
}
