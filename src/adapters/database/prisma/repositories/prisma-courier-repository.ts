import { ICourierEntity } from "../../../../core/entities/courier/types";
import { CourierDatabaseRepository } from "../../../../core/repositories/courier-database-repository";
import { CourierMapper } from "../mappers/courier-mapper";
import { prisma } from "../prisma-client";

export class PrismaCourierRepository implements CourierDatabaseRepository {
  async create(data: Omit<ICourierEntity, 'id' | 'createdAt'>): Promise<ICourierEntity> {
    const courier = await prisma.courier.create({ data })

    return CourierMapper.toDomain(courier)
  }

  async findAll(): Promise<ICourierEntity[]> {
    const couriers = await prisma.courier.findMany()

    return couriers.map((courier) => CourierMapper.toDomain(courier))
  }

  async findById(id: string): Promise<ICourierEntity | null> {
    const courier = await prisma.courier.findUnique({ where: { id } })

    if (!courier) {
      return null
    }
    
    return CourierMapper.toDomain(courier)
  }

  async findByEmail(email: string): Promise<ICourierEntity | null> {
    const courier = await prisma.courier.findUnique({ where: { email } })
    
    if (!courier) {
      return null
    }
    
    return CourierMapper.toDomain(courier)
  }

  async deleteAll(): Promise<void> {
    await prisma.delivery.deleteMany()
    await prisma.courier.deleteMany()
  }
}