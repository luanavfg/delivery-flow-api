import { Request, RequestHandler, Response } from 'express';
import { InMemoryDeliveryDatabaseRepository } from '../../database/in-memory-delivery-database-repository';
import { CreateDeliveryUseCase } from '../../../application/use-cases/create-delivery';
import { UpdateDeliveryUseCase } from '../../../application/use-cases/update-delivery';

const deliveryDatabaseRepository = new InMemoryDeliveryDatabaseRepository();
const createDeliveryUseCase = new CreateDeliveryUseCase(deliveryDatabaseRepository);
const updateDeliveryUseCase = new UpdateDeliveryUseCase(deliveryDatabaseRepository);

export class DeliveryController {
  static create: RequestHandler = async(req, res) => {
    const { courierId, destinyAddress, status } = req.body;
    const delivery = await createDeliveryUseCase.execute({ courierId, destinyAddress, status, updatedAt: null });
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

  static update: RequestHandler = async(req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const delivery = await updateDeliveryUseCase.execute({id, status});
    res.status(201).json(delivery);
  }
}
