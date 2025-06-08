import { ICourierEntity } from "../entities/courier/types";

export abstract class CourierDatabaseRepository {
  abstract findAll(): Promise<ICourierEntity[]>;
  abstract findById(id: string): Promise<ICourierEntity | null>;
  abstract findByEmail(email: string): Promise<ICourierEntity | null>;
  abstract create(data: Omit<ICourierEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ICourierEntity>;
}
