import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/motorcycleService';

describe('Deveria cadastrar motocicleta e realizar buscas com sucesso', function () {
  it('Deveria cadatrar motocicleta com sucesso', async function () {
    // arrange
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f aHornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motorcycleOutput = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f aHornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    // act
    const service = new MotorcycleService();
    const response = await service.create(motorcycleInput);

    // assert
    expect(response).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria listar todas as motocicletas', async function () {
    // arrange
    const motorcycleOutput = [{
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    }];
    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    // act
    const service = new MotorcycleService();
    const response = await service.findAll();

    // assert
    expect(response).to.be.deep.equal(motorcycleOutput);
  });
});