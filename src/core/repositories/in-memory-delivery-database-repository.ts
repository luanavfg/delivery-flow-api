import { IDeliveryEntity } from "../entities/delivery/types";
import { DeliveryDatabaseRepository } from "./delivery-database-repository";
import { faker } from '@faker-js/faker'

export class InMemoryDeliveryDatabaseRepository implements DeliveryDatabaseRepository {
  private deliveries: IDeliveryEntity[] = [];

  async findAll(): Promise<IDeliveryEntity[]> {
    return this.deliveries;
  }

  async findById(id: string): Promise<IDeliveryEntity | null> {
    const delivery = this.deliveries.find(delivery => delivery.id === id) ?? null;
    return delivery 
  }

  async findByCourierId(courierId: string): Promise<IDeliveryEntity[] | null> {
    return this.deliveries.filter(delivery => delivery.courierId === courierId);
  }

  async create(data: Omit<IDeliveryEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<IDeliveryEntity> {
    const newDelivery = { id: faker.string.uuid(), ...data, createdAt: new Date(), updatedAt: null };
    
    this.deliveries.push(newDelivery);
    
    return newDelivery;
  }

  async update(inputDto: Omit<IDeliveryEntity, 'createdAt' | 'item'>): Promise<IDeliveryEntity> {
    const {id, status: newStatus, courierId, destinyAddress, updatedAt} = inputDto

    const deliveryFromDatabase = this.deliveries.find((delivery) => delivery.id === id) ?? null

    if (!deliveryFromDatabase) {
      throw new Error('Delivery not found')
    }

    deliveryFromDatabase.status = newStatus
    deliveryFromDatabase.updatedAt = updatedAt
    deliveryFromDatabase.courierId = courierId
    deliveryFromDatabase.destinyAddress = destinyAddress

    return deliveryFromDatabase
  }

  async deleteAll(): Promise<void> {
    this.deliveries = [];
  }
}
