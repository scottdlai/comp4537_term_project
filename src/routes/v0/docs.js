const { Router } = require('express');
const { getDocs } = require('../../controllers/v0/docs');
const router = Router();

router.get('/', getDocs);

module.exports = router;
