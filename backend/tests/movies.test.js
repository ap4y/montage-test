const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('GET /movies', () => {
  let movieId;
  beforeAll(async () => {
    const res = await db('movies')
      .returning('id')
      .insert({ title: 'Test movie', year: 2016 });
    movieId = res[0];
  });

  afterAll(async () => {
    await db('movies').where('id', movieId).del();
  });

  it('responds with json', async () => {
    const res = await request(app).get('/api/movies');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject({
      id: movieId,
      title: 'Test movie',
      year: 2016,
    });
  });

  describe('GET /movies/:id', () => {
    it('responds with json', async () => {
      const res = await request(app).get(`/api/movies/${movieId}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: movieId,
        title: 'Test movie',
        year: 2016,
      });
    });
  });
});

describe('POST /movies', () => {
  let movieId;

  afterAll(async () => {
    await db('movies').where('id', movieId).del();
  });

  it('responds with json', async () => {
    const movie = {
      title: 'Test movie',
      year: 2016,
      description: 'Test movie',
      director: 'director',
      producer: 'producer',
      screenwriter: 'screenwriter',
    };
    const res = await request(app).post('/api/movies').send({ movie });

    movieId = res.body.id;
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      title: 'Test movie',
      year: 2016,
      description: 'Test movie',
      director: 'director',
      producer: 'producer',
      screenwriter: 'screenwriter',
    });
  });

  describe('missing movie param', () => {
    it('responds with 400', async () => {
      const res = await request(app).post('/api/movies');

      expect(res.status).toBe(400);
    });
  });

  describe('missing movie title', () => {
    it('responds with 422', async () => {
      const res = await request(app)
        .post('/api/movies')
        .send({ movie: { year: 2016 } });

      expect(res.status).toBe(422);
    });
  });

  describe('missing movie year', () => {
    it('responds with 422', async () => {
      const res = await request(app)
        .post('/api/movies')
        .send({ movie: { title: 'test' } });

      expect(res.status).toBe(422);
    });
  });
});
