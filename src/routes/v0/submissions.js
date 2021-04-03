const { Router } = require('express');
const router = Router();
const {
  getSubmissionsByID,
  uploadSubmissionByID,
} = require('../../controllers/v0/submissions');
const incrementAPI = require('../../middlewares/incrementAPI');

router.get(
  '/:quizID',
  incrementAPI('GET /api/v0/submissions/:quizID'),
  getSubmissionsByID
);

router.post(
  '/:quizID',
  incrementAPI('POST /api/v0/submissions/:quizID'),
  uploadSubmissionByID
);

module.exports = router;
