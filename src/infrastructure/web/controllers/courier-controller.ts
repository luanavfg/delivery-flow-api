import { Request, RequestHandler, Response } from 'express';
import { InMemoryCourierDatabaseRepository } from '../../database/in-memory-courier-database-repository';
import { CreateCourierUseCase } from '../../../application/use-cases/create-courier';
import { PrismaCourierRepository } from '../../database/prisma/repositories/prisma-courier-repository';

const courierDatabaseRepository = new PrismaCourierRepository();
const createCourierUseCase = new CreateCourierUseCase(courierDatabaseRepository);

export class CourierController {
  static create: RequestHandler = async (req, res) => {
    const { name, email } = req.body;
    
    const courier = await createCourierUseCase.execute({ name, email, updatedAt: null });
    res.status(201).json(courier);
  };

  static list: RequestHandler = async (req, res) => {
    const couriers = await courierDatabaseRepository.findAll();
    res.json(couriers);
  };

  static getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    
    const courier = await courierDatabaseRepository.findById(id);
    res.json(courier);
  };
}
