const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const movies = await db('movies');
  res.json(movies);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await db('movies').where('id', id).first();
  res.json(movie);
});

router.post('/', async (req, res) => {
  const { movie } = req.body;

  if (!movie) {
    res.status(400).json({ error: 'invalid record' });
    return;
  }

  if (!movie.title) {
    res.status(422).json({ error: 'missing movie title' });
    return;
  }

  if (!movie.year) {
    res.status(422).json({ error: 'missing movie year' });
    return;
  }

  try {
    const [id] = await db('movies').returning('id').insert(movie);
    res.json({ id, ...movie });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
