const { Router } = require('express');
const { getAPICounts } = require('../../controllers/v0/admin');
const router = Router();

router.get('/', getAPICounts);

module.exports = router;
