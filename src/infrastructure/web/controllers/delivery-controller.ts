import { Request, RequestHandler, Response } from 'express';
import { InMemoryDeliveryDatabaseRepository } from '../../database/in-memory-delivery-database-repository';
import { CreateDeliveryUseCase } from '../../../application/use-cases/create-delivery';
import { UpdateDeliveryUseCase } from '../../../application/use-cases/update-delivery';
import { PrismaDeliveryRepository } from '../../database/prisma/repositories/prisma-delivery-repository';

const deliveryDatabaseRepository = new PrismaDeliveryRepository();
const createDeliveryUseCase = new CreateDeliveryUseCase(deliveryDatabaseRepository);
const updateDeliveryUseCase = new UpdateDeliveryUseCase(deliveryDatabaseRepository);

export class DeliveryController {
  static create: RequestHandler = async(req, res) => {
    const { courierId, destinyAddress, status, item } = req.body;
   
    const delivery = await createDeliveryUseCase.execute({ courierId, destinyAddress, status, item, updatedAt: null });
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
    const { id } = req.params;
    const { status } = req.body;
    
    const delivery = await updateDeliveryUseCase.execute({id, status});
    res.status(201).json(delivery);
  }
}
