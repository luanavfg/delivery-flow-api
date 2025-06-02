import { ICourierEntity } from "../entities/courier/types";

export abstract class CourierDatabaseRepository {
  abstract findAll(): Promise<ICourierEntity[]>;
  abstract create(data: Omit<ICourierEntity, 'id' | 'createdAt'>): Promise<ICourierEntity>;
}
