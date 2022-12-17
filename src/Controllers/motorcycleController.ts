import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import CarNotFound from '../middleware/CarNotFound';
import InvalidMongoId from '../middleware/invalidIdError';
import MotorcycleService from '../Services/motorcycleService';

const INVALID_ERROR_MESSAGE = 'Invalid mongo id';
const NOT_FOUND_ERROR = 'Motorcycle not found';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    const newMotorcycle = await this.service.create(motorcycle);
    this.res.status(201).json(newMotorcycle);
  }

  public async getAll() {
    const allMotorcycles = await this.service.findAll();
    return this.res.status(200).json(allMotorcycles);
  }

  public async getById() {
    const { id } = this.req.params;
    if (!isValidObjectId(id)) {
      throw new InvalidMongoId(INVALID_ERROR_MESSAGE);
    }
    const motoById = await this.service.findById(id);
    if (!motoById) {
      throw new CarNotFound(NOT_FOUND_ERROR);
    }
    return this.res.status(200).json(motoById);
  }

  public async updateById() {
    const { id } = this.req.params;
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    if (!isValidObjectId(id)) {
      throw new InvalidMongoId(INVALID_ERROR_MESSAGE);
    }
    const updatedMotorcycle = await this.service.updateById(id, motorcycle);
    if (!updatedMotorcycle) {
      throw new CarNotFound(NOT_FOUND_ERROR);
    }
    return this.res.status(200).json(updatedMotorcycle);
  }
}