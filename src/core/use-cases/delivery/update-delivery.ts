import { IDeliveryEntity } from "../../entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../repositories/delivery-database-repository";
import { ValidationError } from "../../errors/validation-error";
import { IUpdateDeliveryUseCaseInputDto } from "./types";
import { NotFoundError } from "../../errors/not-found-error";
import { CourierDatabaseRepository } from "../../repositories/courier-database-repository";

export class UpdateDeliveryUseCase {
  constructor(
    private deliveryDatabaseRepository: DeliveryDatabaseRepository,
    private courierDatabaseRepository: CourierDatabaseRepository
  ) {}

  async execute(data: IUpdateDeliveryUseCaseInputDto): Promise<IDeliveryEntity> {   
    try {
      const {id, status, courierId, destinyAddress} = data 

      const deliveryFromDatabase = await this.deliveryDatabaseRepository.findById(id)

      if(!deliveryFromDatabase) {
        throw new NotFoundError('Cannot find delivery in database.');
      }

      if(deliveryFromDatabase.status === 'CANCELED') {
        throw new ValidationError('Cannot edit a canceled delivery.');
      }

      if(courierId) {
        const courier = await this.courierDatabaseRepository.findById(courierId);
        
        if (!courier) {
          throw new NotFoundError('Courier not found.');
        }
      }

      const updatedDelivery = this.deliveryDatabaseRepository.update({
        id,
        status: status ?? deliveryFromDatabase.status,
        courierId: courierId ?? deliveryFromDatabase.courierId,
        destinyAddress: destinyAddress ?? deliveryFromDatabase.destinyAddress,
        updatedAt: new Date()
      });

      return updatedDelivery
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}
