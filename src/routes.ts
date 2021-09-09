import { Router } from 'express';

import authMiddleware from './middlewares/authMiddleware';

import UserController from './controllers/userController';
import AuthController from './controllers/authController';

const routes = Router();

// Users
routes.get('/users', authMiddleware, UserController.index);
routes.post('/users', authMiddleware, UserController.create);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

// Authentication
routes.post('/auth', AuthController.authenticate);

export default routes;