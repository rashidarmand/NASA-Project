const request = require('supertest');
const app = require('../../app.js');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('GET /launches', () => {
    test('It should respond with 200 success', async () => {
      await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('POST /launches', () => {
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
        .post('/launches')
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
        .post('/launches')
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
        .post('/launches')
        .send({ ...launchDataWithoutDate, launchDate: 'peanuts' })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid Launch Date.',
      });
    });
  });
});
