import { IDeliveryEntity } from "../entities/delivery/types";

export abstract class DeliveryDatabaseRepository {
  abstract findAll(): Promise<IDeliveryEntity[]>;
  abstract findById(id: string): Promise<IDeliveryEntity | null>;
  abstract findByCourierId(courierId: string): Promise<IDeliveryEntity[] | null>;
  abstract create(data: Omit<IDeliveryEntity, 'id' | 'createdAt'>): Promise<IDeliveryEntity>;
  abstract update(inputDto: {id: string, status: IDeliveryEntity['status']}): Promise<IDeliveryEntity>
}
