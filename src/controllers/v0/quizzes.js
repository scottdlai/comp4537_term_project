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

module.exports = { getRecentQuizzes, getQuizByID, createQuiz };
