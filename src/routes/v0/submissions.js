const { Router } = require('express');
const router = Router();
const {
  getSubmissionsByID,
  uploadSubmissionByID,
} = require('../../controllers/v0/submissions');

router.get('/:quizID', getSubmissionsByID);

router.post('/:quizID', uploadSubmissionByID);

module.exports = router;
