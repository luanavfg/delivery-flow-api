import { ICourierEntity } from "../../../../core/entities/courier/types";
import { CourierDatabaseRepository } from "../../../../core/repositories/courier-database-repository";
import { prisma } from "../prisma-client";

export class PrismaCourierRepository implements CourierDatabaseRepository {
  async create(data: Omit<ICourierEntity, 'id' | 'createdAt'>): Promise<ICourierEntity> {
    const courier = await prisma.courier.create({ data })

    return courier
  }

  async findAll(): Promise<ICourierEntity[]> {
    const couriers = await prisma.courier.findMany()

    return couriers
  }

  async findById(id: string): Promise<ICourierEntity | null> {
    const courier = await prisma.courier.findUnique({ where: { id } })
    
    return courier ?? null
  }

  async findByEmail(email: string): Promise<ICourierEntity | null> {
    const courier = await prisma.courier.findUnique({ where: { email } })
    
    return courier ?? null
  }

  async deleteAll(): Promise<void> {
    await prisma.delivery.deleteMany()
    await prisma.courier.deleteMany()
  }
}