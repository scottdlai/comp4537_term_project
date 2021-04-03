const { Router } = require('express');
const router = Router();
const {
  createQuestionFor,
  updateQuestionByID,
  deleteQuestionByID,
} = require('../../controllers/v0/questions');
const incrementAPI = require('../../middlewares/incrementAPI');

router.post(
  '/:quizID',
  incrementAPI('POST /api/v0/questions/:quizID'),
  createQuestionFor
);

router.put(
  '/:questionID',
  incrementAPI('PUT /api/v0/question/:questionID'),
  updateQuestionByID
);

router.delete(
  '/:questionID',
  incrementAPI('DELETE /api/v0/questions/:questionID'),
  deleteQuestionByID
);

module.exports = router;
