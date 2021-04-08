const { db } = require('../../config');

const createQuestionFor = async (req, res) => {
  const { quizID } = req.params;

  const { questionBody, choices } = req.body;

  try {
    const questionID = await db('questions').insert(
      { quizID, body: questionBody },
      'id'
    );

    const choicesIDs = await db('choices').insert(
      choices.map((choice) => ({ ...choice, questionID })),
      'id'
    );

    res.status(201);
    res.json({ questionID, choices: choicesIDs });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};

const updateQuestionByID = async (req, res) => {
  const { questionID } = req.params;

  const { body, choices } = req.body;

  try {
    await db('questions').update({ body }).where({ id: questionID });

    await db('choices').update(choices).where({ questionID });

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

    res.status(204);
    res.end();
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};

module.exports = { createQuestionFor, updateQuestionByID, deleteQuestionByID };
