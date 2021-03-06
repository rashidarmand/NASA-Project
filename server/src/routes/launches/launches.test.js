const request = require('supertest');
const app = require('../../app.js');
const { loadPlanetsData } = require('../../models/planets.model.js');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

const API_VERSION = '/v1';

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect({ testing: true });
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Get Launches', () => {
    test('It should respond with 200 success and return a list of launches', async () => {
      const response = await request(app)
        .get(`${API_VERSION}/launches`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Add New Launch', () => {
    const completeLaunchData = {
      mission: 'Zero Dark Thirty',
      rocket: 'NSD 1221-b',
      target: 'Kepler-296 A f',
      launchDate: 'April 19, 2027',
    };

    const launchDataWithoutDate = {
      mission: 'Zero Dark Thirty',
      rocket: 'NSD 1221-b',
      target: 'Kepler-296 A f',
    };

    test('It should respond with 201 created', async () => {
      const response = await request(app)
        .post(`${API_VERSION}/launches`)
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing launch details', async () => {
      const response = await request(app)
        .post(`${API_VERSION}/launches`)
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing Launch Details.',
        message: ['launchDate is required.'],
      });
    });

    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post(`${API_VERSION}/launches`)
        .send({ ...launchDataWithoutDate, launchDate: 'peanuts' })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid Launch Date.',
      });
    });
  });

  describe('Delete Launch', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .delete(`${API_VERSION}/launches/${101}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toMatchObject({ ok: true });
    });

    test('It should return a 404 if id is not found', async () => {
      const response = await request(app)
        .delete(`${API_VERSION}/launches/${999}`)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toMatchObject({ error: 'Launch Not found.' });
    });
  });
});
