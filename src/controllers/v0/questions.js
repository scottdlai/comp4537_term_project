const createQuestionFor = async (req, res) => {
  const { quizID } = req.params;

  res.json(`Created question for ${quizID}`);
};

const updateQuestionById = async (req, res) => {
  const { questionID } = req.params;

  res.json(`Updated question ${questionID}`);
};

module.exports = { createQuestionFor, updateQuestionById };
