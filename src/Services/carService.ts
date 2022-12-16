import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private newCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  } 

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.newCarDomain(newCar);
  }

  public async findAll() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    const allCars = cars.map((car) => this.newCarDomain(car));
    return allCars;
  }

  public async findById(id: string) {
    const carODM = new CarODM();
    const getCars = await carODM.getById(id);
    return this.newCarDomain(getCars);
  }

  public async updateById(id: string, car: ICar) {
    const carODM = new CarODM();
    const getCarById = await carODM.updateById(id, car);
    return this.newCarDomain(getCarById);
  }
} 