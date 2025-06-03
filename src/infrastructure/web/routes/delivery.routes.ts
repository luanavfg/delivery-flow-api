import { Router } from 'express';
import { DeliveryController } from '../controllers/delivery-controller';

const router = Router();

router.get('/', DeliveryController.list);
router.post('/', DeliveryController.create);
router.get('/:id', DeliveryController.getById);
router.patch('/:id', DeliveryController.update)

export { router as deliveryRoutes };

