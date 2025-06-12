import { Courier as PrismaCourier } from '@prisma/client';
import { ICourierEntity } from '../../../../core/entities/courier/types';

export class CourierMapper {
  static toDomain(prismaCourier: PrismaCourier): ICourierEntity {
    return {
      id: prismaCourier.id,
      name: prismaCourier.name,
      email: prismaCourier.email,
      updatedAt: prismaCourier.updatedAt,
      createdAt: prismaCourier.createdAt,
    };
  }

  static toPersistence(entity: ICourierEntity): PrismaCourier {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
