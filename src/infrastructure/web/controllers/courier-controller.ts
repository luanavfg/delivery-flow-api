import { Request, Response } from 'express';
import { InMemoryCourierDatabaseRepository } from '../../database/in-memory-courier-database-repository';
import { CreateCourierUseCase } from '../../../application/use-cases/create-courier';

const courierDatabaseRepository = new InMemoryCourierDatabaseRepository();
const createCourier = new CreateCourierUseCase(courierDatabaseRepository);

export class CourierController {
  constructor() {
    this.create = this.create.bind(this);
  }

  public async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const courier = await createCourier.execute({ name, email, updatedAt: null });
    return res.status(201).json(courier);
  }

  public async list(req: Request, res: Response) {
    const couriers = await courierDatabaseRepository.findAll();
    return res.json(couriers);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const courier = await courierDatabaseRepository.findById(id);
    return res.json(courier);
  }
}
