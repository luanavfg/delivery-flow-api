import { Router } from 'express';
import { DeliveryController } from '../controllers/delivery-controller';
import { validate } from '../../../main/middlewares/validate';
import { createDeliverySchema } from '../../../application/schemas/create-delivery.schema';
import { updateDeliverySchema } from '../../../application/schemas/update-delivery-schema';

const router = Router();

router.get('/', DeliveryController.list);
router.post('/', validate(createDeliverySchema), DeliveryController.create);
router.get('/:id', DeliveryController.getById);
router.get('/courier/:id', DeliveryController.getByCourierId);
router.patch('/:id', validate(updateDeliverySchema), DeliveryController.update)

export { router as deliveryRoutes };

