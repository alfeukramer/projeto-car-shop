// import { Schema, Model, models, model } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  // private schema: Schema;
  // private model: Model<IMotorcycle>;

  constructor() {
    const schema = {
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    };
    super(schema, 'cars');
  }
  
  // this.model = models.Motorcycles || model('Motorcycle', this.schema);
  // public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
  //   return this.model.create({ ...motorcycle });
  // }
}