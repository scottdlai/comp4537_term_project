const { Router } = require('express');
const router = Router();
const {
  createQuestionFor,
  updateQuestionByID,
  deleteQuestionByID,
} = require('../../controllers/v0/questions');
const { anyUser } = require('../../middlewares/authenticate');
const incrementAPI = require('../../middlewares/incrementAPI');

router.post(
  '/:quizID',
  incrementAPI('POST /api/v0/questions/:quizID'),
  anyUser,
  createQuestionFor
);

router.put(
  '/:questionID',
  incrementAPI('PUT /api/v0/question/:questionID'),
  anyUser,
  updateQuestionByID
);

router.delete(
  '/:questionID',
  incrementAPI('DELETE /api/v0/questions/:questionID'),
  anyUser,
  deleteQuestionByID
);

module.exports = router;
