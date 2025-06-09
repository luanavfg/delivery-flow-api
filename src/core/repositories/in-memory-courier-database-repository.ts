import { ICourierEntity } from "../entities/courier/types";
import { CourierDatabaseRepository } from "./courier-database-repository";
import { faker } from '@faker-js/faker'

export class InMemoryCourierDatabaseRepository implements CourierDatabaseRepository {
  private couriers: ICourierEntity[] = [];

  async findAll(): Promise<ICourierEntity[]> {
    return this.couriers;
  }

  async create(data: Omit<ICourierEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ICourierEntity> {
    const newCourier = { id: faker.string.uuid(), ...data, createdAt: new Date(), updatedAt: null };
    
    this.couriers.push(newCourier);
    return newCourier;
  }

  async findById(id: string): Promise<ICourierEntity | null> {
    return this.couriers.find(courier => courier.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<ICourierEntity | null> {
    return this.couriers.find(courier => courier.email === email) ?? null;
  }
}
