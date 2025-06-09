import express from 'express';
import { deliveryRoutes } from '../adapters/web/routes/delivery.routes';
import { courierRoutes } from '../adapters/web/routes/courier.routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());
app.use('/couriers', courierRoutes);
app.use('/deliveries', deliveryRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3333, () => console.log('🚀 Server running on port 3333'));
}

export { app };
