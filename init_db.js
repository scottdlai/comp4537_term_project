const { db } = require('./src/config');

const createQuizzes = async () => {
  await db.schema.createTable('quizzes', (table) => {
    table.increments('id');
    table.string('quizName');
    table.date('createdAt');
  });

  console.log('Successfully created `quizzes` table');
};

const createQuestions = async () => {
  await db.schema.createTable('questions', (table) => {
    table.increments('id');
    table.string('body');
    table.integer('quizID').unsigned().notNullable();
    table.foreign('quizID').references('id').inTable('quizzes');
  });

  console.log('Successfully created `questions` table');
};

const createOptions = async () => {
  await db.schema.createTable('choices', (table) => {
    table.increments('id');
    table.string('body');
    table.boolean('isCorrect');
    table.integer('questionID').unsigned().notNullable();
    table.foreign('questionID').references('id').inTable('questions');
  });

  console.log('Successfully created `choices` table');
};

const createSubmissions = async () => {
  await db.schema.createTable('submissions', (table) => {
    table.increments('id');
    table.string('score');
    table.date('submittedAt');
    table.integer('quizID').unsigned().notNullable();
    table.foreign('quizID').references('id').inTable('quizzes');
  });

  console.log('Successfully created `submissions` table');
};

const createAdmin = async () => {
  await db.schema.createTable('admin', (table) => {
    table.string('apiName').primary();
    table.integer('count').defaultTo(0);
  });

  console.log('Successfully created `admin` table');

  await db('admin').insert([
    { apiName: 'GET /api/v0/quizzes' },
    { apiName: 'GET /api/v0/quizzes/:quizID' },
    { apiName: 'GET /api/v0/submissions/:quizID' },
    { apiName: 'POST /api/v0/quizzes' },
    { apiName: 'POST /api/v0/questions/:quizID' },
    { apiName: 'POST /api/v0/submissions/:quizID' },
    { apiName: 'PUT /api/v0/quizzes/:quizID' },
    { apiName: 'PUT /api/v0/question/:questionID' },
    { apiName: 'DELETE /api/v0/quizzes/:quizID' },
    { apiName: 'DELETE /api/v0/questions/:questionID' },
  ]);
  console.log('Successfully init `admin` table with values');
};

const createUsers = async () => {
  await db.schema.createTable('users', (table) => {
    table.string('username').primary();
    table.string('password').notNullable();
  });

  console.log('Successfully created `users` table');
};

const main = async () => {
  await createQuizzes();
  await createQuestions();
  await createOptions();
  await createSubmissions();
  await createAdmin();
  await createUsers();
};

main();
