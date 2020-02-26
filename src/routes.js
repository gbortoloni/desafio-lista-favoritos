import { Router } from 'express';

import ClienteController from './app/controllers/ClienteController';

const routes = new Router();

routes.get('/clientes/:id', ClienteController.show);
routes.post('/clientes', ClienteController.store);
routes.put('/clientes/:id', ClienteController.update);
routes.delete('/clientes/:id', ClienteController.delete);

export default routes;
