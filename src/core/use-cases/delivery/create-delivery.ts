import { IDeliveryEntity } from "../../entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../repositories/delivery-database-repository";
import { ValidationError } from "../../errors/validation-error";
import { CourierDatabaseRepository } from "../../repositories/courier-database-repository";
import { ICreateDeliveryUseCaseInputDto } from "./types";
import { faker } from "@faker-js/faker/.";

export class CreateDeliveryUseCase {
  constructor(
    private deliveryDatabaseRepository: DeliveryDatabaseRepository, 
    private courierDatabaseRepository: CourierDatabaseRepository
  ) {}

  async execute(inputDto: ICreateDeliveryUseCaseInputDto): Promise<IDeliveryEntity> {
    const {courierId, destinyAddress, item, status} = inputDto

    const courier = await this.courierDatabaseRepository.findById(courierId);
 
    if (!courier) {
      throw new ValidationError('Courier not found.');
    }

    const deliveryToCreate: IDeliveryEntity = {
      id: faker.database.mongodbObjectId(), // TODO - Change this
      courierId,
      item,
      destinyAddress,
      status,
      createdAt: new Date(),
      updatedAt: null
    }

    return this.deliveryDatabaseRepository.create(deliveryToCreate);
  }
}
