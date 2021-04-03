const getSubmissionsByID = async (req, res) => {
  const { quizID } = req.params;

  res.json(`Get all submissions for quizID`);
};

const uploadSubmissionByID = async (req, res) => {
  const { quizID } = req.params;

  res.json(`Upload a submissions for quizID`);
};

module.exports = { getSubmissionsByID, uploadSubmissionByID };
