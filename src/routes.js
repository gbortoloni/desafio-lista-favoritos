import { Router } from 'express';

import ClienteController from './app/controllers/ClienteController';
import SessionController from './app/controllers/SessionController';
import FavoritoController from './app/controllers/FavoritoController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/clientes', ClienteController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/clientes/:id', ClienteController.show);
routes.put('/clientes/:id', ClienteController.update);
routes.delete('/clientes/:id', ClienteController.delete);

routes.get('/clientes/:id/favoritos', FavoritoController.index);
routes.put('/clientes/:id/favoritos', FavoritoController.update);

export default routes;
