import { Router } from 'express';
import MotorcycleController from '../Controllers/motorcycleController';

const motorcycleRouter = Router();

motorcycleRouter.post('/motorcycles', (req, res, next) => 
  new MotorcycleController(req, res, next).create());
motorcycleRouter.get('/motorcycles', (req, res, next) => 
  new MotorcycleController(req, res, next).getAll());
motorcycleRouter.get('/motorcycles/:id', (req, res, next) => 
  new MotorcycleController(req, res, next).getById());
motorcycleRouter.put('/motorcycles/:id', (req, res, next) => 
  new MotorcycleController(req, res, next).updateById());

export default motorcycleRouter;