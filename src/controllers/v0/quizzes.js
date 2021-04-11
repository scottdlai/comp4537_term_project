const { db } = require('../../config');

const columns = [
  'quizzes.id as quizID',
  'quizzes.quizName',
  'quizzes.createdAt',
  'questions.id as questionID',
  'questions.body as questionBody',
  'choices.id as choiceID',
  'choices.body as choiceBody',
];

const getRecentQuizzes = async (req, res) => {
  const quizzes = await db('quizzes').select().orderBy('createdAt');

  console.log(quizzes);

  res.json(quizzes);
};

const getQuizByID = async (req, res) => {
  const { quizID } = req.params;
  const { showAnswers } = req.query;

  const columnsToShow = !!showAnswers
    ? [...columns, 'choices.isCorrect']
    : [...columns];

  const rows = await db('quizzes')
    .select(columnsToShow)
    .leftJoin('questions', 'quizzes.id', '=', 'questions.quizID')
    .join('choices', 'questions.id', '=', 'choices.questionID')
    .where({ quizID });

  if (rows.length === 0) {
    res.status(400);
    return res.json({ error: "Quiz doesn't exist" });
  }

  const [{ quizName, createdAt }] = rows;

  const questions = Object.values(
    rows.reduce(
      (
        acc,
        {
          questionID,
          questionBody,
          choiceID,
          choiceBody,
          createdAt,
          quizName,
          ...rest
        }
      ) => {
        const question = { questionID, questionBody };
        const choice = { ...rest, choiceID, choiceBody };

        return questionID in acc
          ? {
              ...acc,
              [questionID]: {
                ...question,
                choices: [...acc[questionID].choices, choice],
              },
            }
          : { ...acc, [questionID]: { ...question, choices: [choice] } };
      },
      {}
    )
  );

  console.log(questions);

  res.status(200);
  res.json({ quizID, quizName, createdAt, questions });
};

const createQuiz = async (req, res) => {
  const { quizName, questions } = req.body;

  console.log(req.body);

  if (!quizName) {
    res.status(400);
    return res.json({ error: 'Quiz name must be a non empty string' });
  }

  if (!questions.every(({ body }) => body)) {
    res.status(400);
    return res.json({ error: 'Body of question must be a non empty string' });
  }

  try {
    const [{ id: quizID }] = await db('quizzes').insert(
      {
        quizName,
        createdAt: new Date(),
      },
      ['id']
    );

    const questionsIDs = await Promise.all(
      questions.map(async ({ body, choices }) => {
        const [{ id: questionID }] = await db('questions').insert(
          { body, quizID },
          ['id']
        );

        const choicesIDs = await db('choices').insert(
          choices.map((choice) => {
            return { ...choice, questionID };
          }),
          ['id']
        );

        console.log(choicesIDs);

        return { choicesIDs: choicesIDs.map(({ id }) => id), questionID };
      })
    );

    res.status(200);
    return res.json({ quizID, questionsIDs });
  } catch (err) {
    res.status(500);
    return res.json({ error: err });
  }
};

const updateQuizName = async (req, res) => {
  const { quizID } = req.params;
  const { quizName } = req.body;

  try {
    await db('quizzes').update({ quizName }).where({ id: quizID });

    res.status(200);
    res.json({});
  } catch (err) {
    res.status(500);
    res.json({ error: err });
  }
};

const deleteQuizByID = async (req, res) => {
  const { quizID } = req.params;

  try {
    await db('submissions').delete().where({ quizID });

    const rows = await db('questions')
      .select('id as questionID')
      .where({ quizID });

    const ids = rows.map(({ questionID }) => questionID);

    await db('choices').delete().whereIn('questionID', ids);

    await db('questions').delete().where({ quizID });

    await db('quizzes').delete().where({ id: quizID });

    return res.status(200);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

module.exports = {
  getRecentQuizzes,
  getQuizByID,
  createQuiz,
  updateQuizName,
  deleteQuizByID,
};
