import request from 'supertest';
import faker from 'faker';
import models from '../../models';
import app from '../index';

describe('City endpoints', () => {
  afterAll(() => {
    app.close();
  });

  let cityId;
  let stateId;
  const name = faker.address.state();

  beforeAll(async (done) => {
    const response = await models.State.create({
      name,
    });
    stateId = response.id;
    done();
  });

  describe('/POST City endpoints', () => {
    it('should create a city successfully', (done) => {
      request(app)
        .post('/api/v1/city')
        .send({
          name,
          males: 350,
          females: 420,
          stateId,
        })
        .expect(201)
        .end((err, res) => {
          const { message, data } = res.body;
          cityId = data.id;

          expect(message).toEqual('City created successfully');
          expect(res.status).toEqual(201)
          done();
        });
    });

    it('should return error when creating an existing city', (done) => {
      request(app)
        .post('/api/v1/city')
        .send({
          name,
          males: 50,
          females: 10,
          stateId,
        })
        .expect(400)
        .end((err, res) => {
          const { message, data } = res.body;

          expect(res.status).toEqual(400);
          expect(message).toEqual('City already exit');
          done();
        });
    });
    it('should return error when name request is not supplied when creating a city', (done) => {
      request(app)
        .post('/api/v1/city')
        .send({
          males: 50,
          females: 10,
          stateId,
        })
        .expect(400)
        .end((err, res) => {
          const { message } = res.body;
          
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('/GET city endpoints', () => {
    it('should get all cities', (done) => {
      request(app)
        .get('/api/v1/city')
        .expect(200)
        .end((err, res) => {
          const { message, data } = res.body;

          expect(message).toEqual('Cities successfully retrieved');
          expect(data.length).toBeGreaterThan(0);
          done();
        });
    });
  });

  describe('/PUT city endpoints', () => {
    it('should updates city details successfully', (done) => {
      request(app)
        .put(`/api/v1/city/${cityId}`)
        .send({
          name: faker.address.state(),
        })
        .expect(200)
        .end((err, res) => {
          const { message, data } = res.body;

          expect(message).toEqual('City successfully updated');
          expect(data.length).toBeGreaterThan(0);
          done();
        });
    });

    it('should return error when updating a non-existing city details', (done) => {
      request(app)
        .put('/api/v1/city/100')
        .expect(404)
        .end((err, res) => {
          const { message, data } = res.body;

          expect(message).toEqual('City not found');
          expect(data.length).toEqual(0);
          done();
        });
    });
  });

  describe('/DELETE city endpoint', () => {
    it('should return error when trying to delete a non-existing state', (done) => {
      request(app)
        .delete('/api/v1/city/9000')
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          const { message, data } = res.body;

          expect(message).toEqual('City not found');
          expect(data.length).toEqual(0);
          done();
        });
    });

    it('should delete a city detail successfully', (done) => {
      request(app)
        .delete(`/api/v1/city/${cityId}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          const { message, data } = res.body;

          expect(message).toEqual('City successfully deleted');
          expect(data.length).toBeGreaterThan(0);
          done();
        });
    });

    it('should return error when trying to delete with invalid cityId', (done) => {
      request(app)
        .delete('/api/v1/city/as')
        .expect(400)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
});