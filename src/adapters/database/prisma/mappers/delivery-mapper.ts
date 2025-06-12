import { Delivery as PrismaDelivery } from '@prisma/client';
import { IDeliveryEntity } from '../../../../core/entities/delivery/types';

export class DeliveryMapper {
  static toDomain(prismaDelivery: PrismaDelivery): IDeliveryEntity {
    return {
      id: prismaDelivery.id,
      item: prismaDelivery.item,
      status: prismaDelivery.status,
      courierId: prismaDelivery.courierId,
      destinyAddress: prismaDelivery.destinyAddress,
      createdAt: prismaDelivery.createdAt,
      updatedAt: prismaDelivery.updatedAt,
    };
  }

  static toPersistence(entity: IDeliveryEntity): PrismaDelivery {
    return {
      id: entity.id,
      item: entity.item,
      status: entity.status,
      courierId: entity.courierId,
      destinyAddress: entity.destinyAddress,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}