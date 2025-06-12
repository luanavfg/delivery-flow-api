import { IDeliveryEntity } from "../../entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../repositories/delivery-database-repository";
import { CourierDatabaseRepository } from "../../repositories/courier-database-repository";
import { ICreateDeliveryUseCaseInputDto } from "./types";
import { NotFoundError } from "../../errors/not-found-error";

export class CreateDeliveryUseCase {
  constructor(
    private deliveryDatabaseRepository: DeliveryDatabaseRepository, 
    private courierDatabaseRepository: CourierDatabaseRepository
  ) {}

  async execute(inputDto: ICreateDeliveryUseCaseInputDto): Promise<IDeliveryEntity> {
    try {
      const { courierId, destinyAddress, item, status} = inputDto

      const courier = await this.courierDatabaseRepository.findById(courierId);
 
      if (!courier) {
        throw new NotFoundError('Courier not found.');
      }

      const deliveryToCreate: Omit<IDeliveryEntity, 'id'> = {
        courierId,
        item,
        destinyAddress,
        status,
        createdAt: new Date(),
        updatedAt: null
      }

      return this.deliveryDatabaseRepository.create(deliveryToCreate);
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}
