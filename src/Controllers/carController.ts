import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import CarService from '../Services/carService';
import ICar from '../Interfaces/ICar';

export default class CarController { 
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    const newCar = await this.service.create(car);
    this.res.status(201).json(newCar);
  }

  public async getAll() {
    const allCars = await this.service.findAll();
    return this.res.status(200).json(allCars);
  }

  public async getById() {
    const { id } = this.req.params;
    if (!isValidObjectId(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
    const carById = await this.service.findById(id);
    if (!carById) {
      return this.res.status(404).json({ message: 'Car not found' });
    }
    return this.res.status(200).json(carById);
  }

  public async updateById() {
    const { id } = this.req.params;
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    if (!isValidObjectId(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
    const updatedCar = await this.service.updateById(id, car);
    if (!updatedCar) {
      return this.res.status(404).json({ message: 'Car not found' });
    }
    return this.res.status(200).json(updatedCar);
  }
}
