const { Router } = require('express');
const router = Router();
const { db } = require('../../config');
const {
  getRecentQuizzes,
  getQuizByID,
  createQuiz,
  deleteQuizByID,
} = require('../../controllers/v0/quizzes');
const incrementAPI = require('../../middlewares/incrementAPI');

router.get('/', incrementAPI('GET /api/v0/quizzes'), getRecentQuizzes);

router.get(
  '/:quizID',
  incrementAPI('GET /api/v0/quizzes/:quizID'),
  getQuizByID
);

router.post('/', incrementAPI('POST /api/v0/quizzes/'), createQuiz);

router.put('/:quizID', incrementAPI('PUT /api/v0/quizzes/:quizID'));

router.delete(
  '/:quizID',
  incrementAPI('DELETE /api/v0/quizzes/:quizID'),
  deleteQuizByID
);

module.exports = router;
