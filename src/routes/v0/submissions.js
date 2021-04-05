const { Router } = require('express');
const router = Router();
const {
  getSubmissionsByID,
  uploadSubmissionByID,
} = require('../../controllers/v0/submissions');
const { anyUser } = require('../../middlewares/authenticate');
const incrementAPI = require('../../middlewares/incrementAPI');

router.get(
  '/:quizID',
  incrementAPI('GET /api/v0/submissions/:quizID'),
  anyUser,
  getSubmissionsByID
);

router.post(
  '/:quizID',
  incrementAPI('POST /api/v0/submissions/:quizID'),
  anyUser,
  uploadSubmissionByID
);

module.exports = router;
