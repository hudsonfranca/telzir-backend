import { Router } from 'express';
import DddController from './controllers/DddController';
import PlansController from './controllers/PlansController';

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

export default routes;
