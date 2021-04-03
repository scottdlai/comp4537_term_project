const { Router } = require('express');
const router = Router();
const {
  createQuestionFor,
  updateQuestionById,
} = require('../../controllers/v0/questions');

router.post('/:quizID', createQuestionFor);

router.put('/:questionID', updateQuestionById);

module.exports = router;
