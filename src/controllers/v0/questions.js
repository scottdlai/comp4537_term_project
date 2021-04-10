const { db } = require('../../config');

const createQuestionFor = async (req, res) => {
  const { quizID } = req.params;

  const { questionBody, choices } = req.body;

  try {
    const questionIDRow = await db('questions').insert(
      { quizID, body: questionBody },
      'id'
    );

    if (questionIDRow.length !== 1) {
      throw new Error('Internal server error');
    }

    const [questionID] = questionIDRow;

    const choicesIDs = await Promise.all(
      choices.map(({ body, isCorrect }) => {
        return db('choices').insert({ body, isCorrect, questionID }, 'id');
      })
    );

    res.status(201);
    res.json({ questionID, choices: choicesIDs.flat() });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error });
  }
};

const updateQuestionByID = async (req, res) => {
  const { questionID } = req.params;

  const { body, choices } = req.body;

  console.log(choices);

  try {
    await db('questions').update({ body }).where({ id: questionID });

    await Promise.all(
      choices.map(async ({ choiceID: id, choiceBody: body, isCorrect }) => {
        return db('choices').update({ body, isCorrect }).where({ id });
      })
    );

    res.status(204);
    res.end();
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};

const deleteQuestionByID = async (req, res) => {
  const { questionID } = req.params;

  try {
    await db('choices').delete().where({ questionID });

    await db('questions').delete().where({ id: questionID });

    res.status(204);
    res.end();
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};

module.exports = { createQuestionFor, updateQuestionByID, deleteQuestionByID };
