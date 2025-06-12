import { Request, RequestHandler, Response } from 'express';
import { InMemoryDeliveryDatabaseRepository } from '../../../core/repositories/in-memory-delivery-database-repository';
import { PrismaDeliveryRepository } from '../../database/prisma/repositories/prisma-delivery-repository';
import z from 'zod';
import { CreateDeliveryUseCase } from '../../../core/use-cases/delivery/create-delivery';
import { UpdateDeliveryUseCase } from '../../../core/use-cases/delivery/update-delivery';
import { PrismaCourierRepository } from '../../database/prisma/repositories/prisma-courier-repository';

const deliveryDatabaseRepository = new PrismaDeliveryRepository();
const courierDatabaseRepository = new PrismaCourierRepository();
const createDeliveryUseCase = new CreateDeliveryUseCase(deliveryDatabaseRepository, courierDatabaseRepository);
const updateDeliveryUseCase = new UpdateDeliveryUseCase(deliveryDatabaseRepository, courierDatabaseRepository);

export class DeliveryController {
  static create: RequestHandler = async(req, res) => {
    const { courierId, destinyAddress, status, item } = req.body;
   
    const delivery = await createDeliveryUseCase.execute({ courierId, destinyAddress, status, item});
    res.status(201).json(delivery);
  }

  static list: RequestHandler = async (req, res) => {
    const deliverys = await deliveryDatabaseRepository.findAll();
    res.json(deliverys);
  }

  static getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const delivery = await deliveryDatabaseRepository.findById(id);
    res.json(delivery);
  };

  static getByCourierId: RequestHandler = async (req, res) => {
    const { courierId } = req.params;
    const deliveries = await deliveryDatabaseRepository.findByCourierId(courierId);
    res.json(deliveries);
  };

  static update: RequestHandler = async(req, res) => {
    const idParamSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = idParamSchema.parse(req.params)
    const { status, destinyAddress, courierId} = req.body;
    
    const delivery = await updateDeliveryUseCase.execute({
      id,
      courierId,
      destinyAddress,
      status
    });
    res.status(201).json(delivery);
  }
}
