const { Router } = require('express');
const { getAPICounts } = require('../../controllers/v0/admin');
const { adminLogin } = require('../../middlewares/authenticate');
const router = Router();

router.get('/', adminLogin, getAPICounts);

module.exports = router;
