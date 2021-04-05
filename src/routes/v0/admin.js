const { Router } = require('express');
const { getAPICounts } = require('../../controllers/v0/admin');
const { adminOnly } = require('../../middlewares/authenticate');
const router = Router();

router.get('/', adminOnly, getAPICounts);

module.exports = router;
