const express = require('express');
const path = require('path');

const moviesRouter = require('./routes/movies');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', moviesRouter);

module.exports = app;
