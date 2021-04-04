const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const passport = require('passport');
// require('./src/initializers/passport');
// require('./src/config/config.js');

// Set up the express app
const app = express();

const quizzesRouter = require('./src/routes/v0/quizzes');
const questionsRouter = require('./src/routes/v0/questions');
const submissionRouter = require('./src/routes/v0/submissions');
const adminRouter = require('./src/routes/v0/admin');
const docsRouter = require('./src/routes/v0/docs');

// Log requests to the console.
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');

app.use('/api/v0/quizzes', quizzesRouter);
app.use('/api/v0/questions', questionsRouter);
app.use('/api/v0/submissions', submissionRouter);
app.use('/api/v0/admin', adminRouter);
app.use('/api/v0/docs', docsRouter);

module.exports = app;
