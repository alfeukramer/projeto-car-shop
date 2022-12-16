import { Router } from 'express';
import CarController from '../Controllers/carController';

const carRouter = Router();

carRouter.post('/cars', (req, res, next) => new CarController(req, res, next).create());
carRouter.get('/cars', (req, res, next) => new CarController(req, res, next).getAll());
carRouter.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getById());
carRouter.put('/cars/:id', (req, res, next) => new CarController(req, res, next).updateById());

export default carRouter;