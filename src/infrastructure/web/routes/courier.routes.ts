import { Router } from 'express';
import { CourierController } from '../controllers/courier-controller';
import { validate } from '../../../main/middlewares/validate';
import { createCourierSchema } from '../../../application/schemas/create-courier.schema';

const router = Router();

router.get('/', CourierController.list);
router.post('/', validate(createCourierSchema),CourierController.create);
router.get('/:id', CourierController.getById);

export { router as courierRoutes };
