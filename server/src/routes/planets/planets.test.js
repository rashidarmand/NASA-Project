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

  describe('Get Planets', () => {
    test('It should respond with 200 success and return a list of planets', async () => {
      const response = await request(app)
        .get(`${API_VERSION}/planets`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toStrictEqual(8);
    });
  });
});
