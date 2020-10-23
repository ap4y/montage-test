const express = require('express');
const path = require('path');

const moviesRouter = require('./routes/movies');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const environment = process.env.NODE_ENV || 'development';
if (environment == 'development') app.use(require('cors')());

app.use('/api/movies', moviesRouter);

module.exports = app;
