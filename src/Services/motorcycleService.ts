import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private newMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.newMotorcycleDomain(newMotorcycle);
  }

  public async findAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();
    const allMotorcycles = motorcycles.map((bike) => this.newMotorcycleDomain(bike));
    return allMotorcycles;
  }

  public async findById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const getMotorcycles = await motorcycleODM.getById(id);
    return this.newMotorcycleDomain(getMotorcycles);
  }
}