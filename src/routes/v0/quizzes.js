const { Router } = require('express');
const router = Router();
const { db } = require('../../config');
const {
  getRecentQuizzes,
  getQuizByID,
  createQuiz,
  deleteQuizByID,
} = require('../../controllers/v0/quizzes');

router.get('/', getRecentQuizzes);
router.get('/:quizID', getQuizByID);
router.put('/:quizID', createQuiz);
router.delete('/:quizID', deleteQuizByID);

module.exports = router;
