import { IDeliveryEntity } from "../../../../core/entities/delivery/types";
import { DeliveryDatabaseRepository } from "../../../../core/repositories/delivery-database-repository";
import { prisma } from "../prisma-client";

export class PrismaDeliveryRepository implements DeliveryDatabaseRepository {

  async findAll(): Promise<IDeliveryEntity[]> {
    const deliveries = await prisma.delivery.findMany()
    return deliveries
  }

  async findById(id: string): Promise<IDeliveryEntity | null> {
    const delivery = await prisma.delivery.findUnique({ where: { id } })
    
    return delivery ?? null
  }

  async findByCourierId(courierId: string): Promise<IDeliveryEntity[] | null> {
    const deliveries: IDeliveryEntity[] = await prisma.delivery.findMany({ where: { courierId } })
    
    return deliveries
  }

  async create(data: Omit<IDeliveryEntity, 'id' | 'createdAt'>): Promise<IDeliveryEntity> {
    const delivery = await prisma.delivery.create({ data })
    return delivery
  }

  async update(inputDto: { id: string; status: IDeliveryEntity["status"]; }): Promise<IDeliveryEntity> {
    const { id, status: newStatus } = inputDto

    const delivery = await prisma.delivery.update({
      where: { id },
      data: { status: newStatus, updatedAt: new Date() }
    })

    return delivery
  }
}