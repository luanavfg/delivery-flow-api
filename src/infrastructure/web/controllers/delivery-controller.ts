import { Request, Response } from 'express';
import { InMemoryDeliveryDatabaseRepository } from '../../database/in-memory-delivery-database-repository';
import { CreateDeliveryUseCase } from '../../../application/use-cases/create-delivery';

const deliveryRepo = new InMemoryDeliveryDatabaseRepository();
const createDelivery = new CreateDeliveryUseCase(deliveryRepo);

export class DeliveryController {
  static async create(req: Request, res: Response) {
    const { courierId, destinyAddress, status } = req.body;
    const delivery = await createDelivery.execute({ courierId, destinyAddress, status, updatedAt: null });
    return res.status(201).json(delivery);
  }

  static async list(req: Request, res: Response) {
    const deliverys = await deliveryRepo.findAll();
    return res.json(deliverys);
  }
}
