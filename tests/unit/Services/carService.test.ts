import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/carService';
import ICar from '../../../src/Interfaces/ICar';
import InvalidMongoId from '../../../src/middleware/invalidIdError';
import CarNotFound from '../../../src/middleware/CarNotFound';

describe('Deveria cadastrar veículo e realizar buscas com sucesso', function () {
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

  it('Deveria buscar vehicle pelo ID com sucesso', async function () {
    // arrange
    const id = '639d358a29c2e46995e1d24a';
    const inputById = {
      id: '639d358a29c2e46995e1d24a',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findById').resolves(inputById);      
    // act

    const service = new CarService();
    const response = await service.findById(id);

    // assert
    expect(response).to.be.deep.equal(inputById);
  });

  it('Deveria devolver mensagem de error ao não encontrar carro', async function () {
    // arrange 
    const id = 'iuwsgigasidfgiu';
    sinon.stub(Model, 'findById').resolves(undefined);
    // act 
    try {
      const service = new CarService();
      await service.findById(id);
    } catch (err) {
      expect((err as CarNotFound).message).to.be.equal('Car not found');
      expect((err as CarNotFound).status).to.be.equal(404);
    }
  });

  it('Deveria devolver mensagem de erro ao não encontrar ID válido', async function () {
    // arrange
    const id = '639d358a29c2e46995e1aaaaad24a';
    sinon.stub(Model, 'findById').resolves(null); 

    // act
    try {
      const service = new CarService();
      await service.findById(id);
    } catch (err) {
      expect((err as InvalidMongoId).message).to.be.equal('Invalid mongo id');
      expect((err as InvalidMongoId).status).to.be.equal(404);
    }
  });

  it('Deveria buscar e atualizar vehicle pelo ID', async function () {
    // arrange
    const id = '639d358a29c2e46995e1d24a';
    const input = {
      id: '639d358a29c2e46995e1d24a',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findOneAndUpdate').resolves(input);

    // act 
    const service = new CarService();
    const response = await service.updateById(id, input);

    // assert
    expect(response).to.be.deep.equal(input);
  });

  afterEach(function () {
    sinon.restore();
  });
});