const { Router } = require('express');
const router = Router();
const { db } = require('../../config');
const {
  getRecentQuizzes,
  getQuizByID,
  createQuiz,
} = require('../../controllers/v0/quizzes');

router.get('/', getRecentQuizzes);
router.get('/:quizID', getQuizByID);
router.put('/:quizID', createQuiz);

module.exports = router;
