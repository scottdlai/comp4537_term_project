const { errors } = require('compose-middleware');
const { db } = require('../../config');

const getSubmissionsByID = async (req, res) => {
  const { quizID } = req.params;

  try {
    const submissions = await db('submissions').where({ quizID }).select();

    res.status(200);
    res.json(submissions);
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};

const uploadSubmissionByID = async (req, res) => {
  const { quizID } = req.params;
  const { choices } = req.body;
  const { username } = res.locals;

  try {
    const choicesRows = await db('choices')
      .select('isCorrect')
      .whereIn('id', choices);

    const score = choicesRows.filter(({ isCorrect }) => isCorrect).length;

    const id = await db('submissions').insert(
      {
        quizID,
        username,
        score,
        submittedAt: new Date(),
      },
      'id'
    );

    res.status(200);
    res.json({ score, id });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getSubmissionsByID, uploadSubmissionByID };
