import { Router } from 'express';

const deliveryRoutes = Router();

type IDelivery = {
  id: number;
  courierId: number;
  destinyAddress: string;
  status: string;
};

const deliveries: Array<IDelivery> = [];

deliveryRoutes.get('/', (res) => res.json(deliveries));
deliveryRoutes.post('/', (req, res) => {
  const { courierId, destinyAddress } = req.body;
  const newDelivery = { id: deliveries.length + 1, courierId, destinyAddress, status: 'pending' };
  deliveries.push(newDelivery);
  res.status(201).json(newDelivery);
});

deliveryRoutes.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const delivery = deliveries.find((d) => d.id === Number(id));
  if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
  delivery.status = status;
  res.json(delivery);
});


export { deliveryRoutes }
