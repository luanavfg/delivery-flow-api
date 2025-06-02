import { CourierController } from '../controllers/courier-controller';
import  express  from 'express';

async function appBootstrap() {
  try {
    const app = express();
    const courierController = new CourierController();

    app.get('/:id', courierController.getById);
    app.get('/', courierController.list);

    app.post('/', courierController.create)
  }
  catch(err) {
    console.error('Erro during dynamic import', {
      labels: {
        module: 'appBootstrap',
        error: err,
      },
    });
  }
}

export default appBootstrap;

