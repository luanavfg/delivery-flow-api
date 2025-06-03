import { Router } from 'express';
import { CourierController } from '../controllers/courier-controller';

const router = Router();

router.get('/', CourierController.list);
router.post('/', CourierController.create);
router.get('/:id', CourierController.getById);

export { router as courierRoutes };
