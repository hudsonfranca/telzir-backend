import { Router } from 'express';
import DddController from './controllers/DddController';
import PlansController from './controllers/PlansController';
import PriceController from './controllers/PriceController';
import CalculatePriceController from './controllers/CalculatePriceController';

const routes = Router();

// DDD ROUTES//
routes.post('/ddd', DddController.store);
routes.get('/ddd/:id', DddController.show);
routes.get('/ddd', DddController.index);
routes.delete('/ddd/:id', DddController.Delete);
routes.put('/ddd/:id', DddController.update);

// PLANS ROUTES //
routes.post('/plan', PlansController.store);
routes.delete('/plan/:id', PlansController.Delete);
routes.get('/plan/:id', PlansController.show);
routes.put('/plan/:id', PlansController.update);
routes.get('/plan', PlansController.index);

// PRICE ROUTES //
routes.post('/price', PriceController.store);
routes.delete('/price/:id', PriceController.Delete);
routes.get('/price/:id', PriceController.show);
routes.put('/price/:id', PriceController.update);
routes.get('/price', PriceController.index);

// CALCULATE PRICE ROUTES //
routes.post('/calculate-price', CalculatePriceController.show);

export default routes;
