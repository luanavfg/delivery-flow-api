import { IDeliveryEntity } from "../../entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../repositories/delivery-database-repository";
import { ValidationError } from "../../errors/validation-error";
import { IUpdateDeliveryUseCaseInputDto } from "./types";
import { NotFoundError } from "../../errors/not-found-error";

export class UpdateDeliveryUseCase {
  constructor(private deliveryDatabaseRepository: DeliveryDatabaseRepository) {}

  async execute(data: IUpdateDeliveryUseCaseInputDto): Promise<IDeliveryEntity> {   
    const {id, status, courierId, destinyAddress} = data 

    if(status && status === 'CANCELED') {
      throw new ValidationError('Cannot edit a canceled delivery.');
    }

    const deliveryFromDatabase = await this.deliveryDatabaseRepository.findById(id)

    if (!deliveryFromDatabase) {
      throw new NotFoundError('Cannot find delivery in database.');
    }

    const updatedDelivery = this.deliveryDatabaseRepository.update({
      id,
      status: status ?? deliveryFromDatabase.status,
      courierId: courierId ?? deliveryFromDatabase.courierId,
      destinyAddress: destinyAddress ?? deliveryFromDatabase.destinyAddress,
      updatedAt: new Date()
    });

    return updatedDelivery
  }
}
