import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
// import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/carService';
import ICar from '../../../src/Interfaces/ICar';

describe('Deveria cadatrar veículo ', function () {
  it('Deveria cadatrar veículo com sucesso', async function () {
    // arrange
    const vehicleInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const vehicleOutput = {
      id: '639d358a29c2e46995e1d24a',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'create').resolves(vehicleOutput);

    // act
    const service = new CarService();
    const result = await service.create(vehicleInput); 
    // assert

    expect(result).to.be.deep.equal(vehicleOutput);
  });

  it('Deveria listar todos os carros', async function () {
    // arrange
    const inputList = [{
      id: '639d358a29c2e46995e1d24a',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    }];
    sinon.stub(Model, 'find').resolves(inputList);

    // act 
    const service = new CarService();
    const response = await service.findAll();

    // assert
    expect(response).to.be.deep.equal(inputList);
  });
});