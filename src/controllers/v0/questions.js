const createQuestionFor = async (req, res) => {
  const { quizID } = req.params;

  res.json(`Created question for ${quizID}`);
};

const updateQuestionByID = async (req, res) => {
  const { questionID } = req.params;

  res.json(`Updated question ${questionID}`);
};

const deleteQuestionByID = async (req, res) => {
  const { questionID } = req.params;

  res.json(`Deleted question ${questionID}`);
};

module.exports = { createQuestionFor, updateQuestionByID, deleteQuestionByID };
