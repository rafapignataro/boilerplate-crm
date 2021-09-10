import { Router } from 'express';

import auth from './middlewares/auth';
import permissions from './middlewares/permissions';

import UserController from './controllers/userController';
import AuthController from './controllers/authController';

const routes = Router();

// Authentication
routes.post('/auth', AuthController.authenticate);

// Users
routes.get('/users/:id?', auth, UserController.index);
routes.post('/users', auth, permissions(['admin']), UserController.create);
routes.put('/users/:id', auth, permissions(['admin']), UserController.update);
routes.delete('/users/:id', auth, permissions(['admin']), UserController.delete);

export default routes;