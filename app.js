const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('./src/config/passport');

// Set up the express app
const app = express();

app.use(passport.initialize());
app.use(passport.session());

// Log requests to the console.
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v0/quizzes', require('./src/routes/v0/quizzes'));
app.use('/api/v0/questions', require('./src/routes/v0/questions'));
app.use('/api/v0/submissions', require('./src/routes/v0/submissions'));
app.use('/api/v0/admin', require('./src/routes/v0/admin'));
app.use('/api/v0/docs', require('./src/routes/v0/docs'));
app.use('/auth', require('./src/routes/auth'));

module.exports = app;
