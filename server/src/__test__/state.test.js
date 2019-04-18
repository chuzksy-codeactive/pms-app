import request from 'supertest';
import faker from 'faker';

import app from '../index';

describe('State endpoints', () => {
  afterAll(() => {
    app.close();
  });

  const state = faker.address.state();
  let stateId;

  describe('/POST endpoints', () => {
    it('should create a state', (done) => {
      request(app)
        .post('/api/v1/state')
        .send({ name: state })
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          const { message } = res.body;
          stateId = res.body.data.id
          expect(message).toEqual('State successfully created');
          expect(res.status).toEqual(201);
          done();
        });
    });
    it('should return 400 when creating an existing state', (done) => {
      request(app)
        .post('/api/v1/state')
        .send({ name: state })
        .expect(400)
        .end((err, res) => {
          const { message, data } = res.body;
          expect(res.status).toEqual(400)
          expect(message).toEqual('State details already exist');
          done();
        });
    });
    it('should return 422 when name is not supplied when creating a state', (done) => {
      request(app)
        .post('/api/v1/state')
        .send()
        .expect(400)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('/GET state endpoints', () => {
    it('should get all states and return 200', (done) => {
      request(app)
        .get('/api/v1/state')
        .expect(200)
        .end((err, res) => {
          const { message, data } = res.body;
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('States successfully retrieved');
          expect(data.length).toBeGreaterThan(0);
          done();
        });
    });
    it('should return 404 when endpoint does not exist', (done) => {
      request(app)
        .get('/api/v1/tia')
        .expect(404)
        .end((err, res) => {
          const { message } = res.body;

          expect(res.status).toEqual(404)
          expect(message).toEqual('You route does not exist');
          done();
        });
    });
  });

  describe('/PUT state endpoints', () => {
    it('should updates state details successfully', (done) => {
      request(app)
        .put(`/api/v1/state/${Number(stateId)}`)
        .expect(200)
        .end((err, res) => {
          const { message, data } = res.body;
          expect(message).toEqual('State successfully updated');
          expect(data.length).toBeGreaterThan(0);
          done();
        });
    });

    it('should return 404 when a non existing data is updated', (done) => {
      request(app)
        .put('/api/v1/state/1007987')
        .expect(404)
        .end((err, res) => {
          const { message, data } = res.body;

          expect(res.status).toEqual(404)
          expect(message).toEqual('State not found');
          done();
        });
    });
  });

  describe('/DELETE state endpoint', () => {
    it('should return 404 when a non-exiting data is deleted', (done) => {
      request(app)
        .delete('/api/v1/state/9000')
        .expect(404)
        .end((err, res) => {
          const { message, data } = res.body;

          expect(res.status).toEqual(404);
          expect(message).toEqual('State can not be found');
          expect(data.length).toEqual(0);
          done();
        });
    });

    it('should delete a state successfully', (done) => {
      request(app)
        .delete(`/api/v1/state/${Number(stateId)}`)
        .expect(200)
        .end((err, res) => {
          const { message, data } = res.body;

          expect(message).toEqual('State successfully deleted');
          expect(data.length).toBeGreaterThan(0);
          done();
        });
    });

    it('should return 422 when stateId is not supplied when deleting', (done) => {
      request(app)
        .delete('/api/v1/state/as')
        .expect(400)
        .end((err, res) => {
          const { message } = res.body;

          expect(res.status).toEqual(400);
          done();
        });
    });
  });
});