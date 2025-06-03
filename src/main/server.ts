import express from 'express';
import { deliveryRoutes } from '../infrastructure/web/routes/delivery.routes';
import { courierRoutes } from '../infrastructure/web/routes/courier.routes';

const app = express();
app.use(express.json());

app.use('/couriers', courierRoutes);
app.use('/deliveries', deliveryRoutes);

app.listen(3333, () => console.log('🚀 Server running on port 3333'));
