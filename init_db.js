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

const main = async () => {
  await createQuizzes();
  await createQuestions();
  await createOptions();
  await createSubmissions();
};

main();
