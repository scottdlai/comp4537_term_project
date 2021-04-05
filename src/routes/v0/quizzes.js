const { Router } = require('express');
const router = Router();
const {
  getRecentQuizzes,
  getQuizByID,
  createQuiz,
  deleteQuizByID,
  updateQuizName,
} = require('../../controllers/v0/quizzes');
const { anyUser, adminOnly } = require('../../middlewares/authenticate');
const incrementAPI = require('../../middlewares/incrementAPI');

router.get('/', incrementAPI('GET /api/v0/quizzes'), anyUser, getRecentQuizzes);

router.get(
  '/:quizID',
  incrementAPI('GET /api/v0/quizzes/:quizID'),
  anyUser,
  getQuizByID
);

router.post('/', incrementAPI('POST /api/v0/quizzes'), anyUser, createQuiz);

router.put(
  '/:quizID',
  incrementAPI('PUT /api/v0/quizzes/:quizID'),
  anyUser,
  updateQuizName
);

router.delete(
  '/:quizID',
  incrementAPI('DELETE /api/v0/quizzes/:quizID'),
  adminOnly,
  deleteQuizByID
);

module.exports = router;
