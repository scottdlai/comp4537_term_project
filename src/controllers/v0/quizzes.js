const { db } = require('../../config');

const columns = [
  'quizzes.id as quizID',
  'quizzes.quiz_name',
  'quizzes.created_at',
  'questions.id as question_id',
  'questions.body as question_body',
  'choices.id as choice_id',
  'choices.body as choice_body',
  'choices.is_correct',
];

const getRecentQuizzes = async (req, res) => {
  const quizzes = await db('quizzes').select().orderBy('createdAt');

  console.log(quizzes);

  res.json(quizzes);
};

const getQuizByID = async (req, res) => {
  const { quizID } = req.params;

  const rows = await db('quizzes')
    .select(...columns)
    .join('questions', 'quizzes.id', '=', 'questions.quizID')
    .join('choices', 'questions.id', '=', 'choices.questionID')
    .where({ 'quizzes.id': quizID });

  console.log(rows);

  res.json(`Get quizzes of ${quizID}`);
};

const createQuiz = async (req, res) => {
  const { quizName, questions } = req.body;

  console.log(req.body);

  if (!quizName) {
    res.status(401);
    return res.json({ error: 'Quiz name must be a non empty string' });
  }

  if (!questions.every(({ body }) => body)) {
    res.status(401);
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
    res.status(501);
    return res.json({ error: err });
  }
};

const deleteQuizByID = async (req, res) => {
  const { quizID } = req.params;

  res.json(`Deleted quiz of ${quizID}`);
};

module.exports = { getRecentQuizzes, getQuizByID, createQuiz, deleteQuizByID };
