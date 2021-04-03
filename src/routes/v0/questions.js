const { Router } = require('express');
const router = Router();
const {
  createQuestionFor,
  updateQuestionByID,
  deleteQuestionByID,
} = require('../../controllers/v0/questions');

router.post('/:quizID', createQuestionFor);

router.put('/:questionID', updateQuestionByID);

router.delete('/:questionID', deleteQuestionByID);

module.exports = router;
