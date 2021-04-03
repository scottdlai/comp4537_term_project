const { db } = require('../../config');

const getRecentQuizzes = async (req, res) => {
  res.json('Get recent quizzes');
};

const getQuizByID = async (req, res) => {
  const { quizID } = req.params;

  res.json(`Get quizzes of ${quizID}`);
};

const createQuiz = async (req, res) => {
  res.json('Creates a quiz');
};

const deleteQuizByID = async (req, res) => {
  const { quizID } = req.params;

  res.json(`Deleted quiz of ${quizID}`);
};

module.exports = { getRecentQuizzes, getQuizByID, createQuiz, deleteQuizByID };
