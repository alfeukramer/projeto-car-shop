import { model, Model, models, Schema, SchemaDefinition, SchemaDefinitionType } from 'mongoose';

export default class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;

  constructor(schema: SchemaDefinition<SchemaDefinitionType<T>>, collection: string) {
    this.schema = new Schema<T>({ ...schema });
    this.model = models[collection] || model(collection, this.schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find({});
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async updateById(id: string, vehicle: any): Promise<T | null> {
    return this.model.findOneAndUpdate({ _id: id }, { ...vehicle }, { returnOriginal: false });
  }
}