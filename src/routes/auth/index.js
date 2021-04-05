const { Router } = require('express');
const { login, register } = require('../../controllers/auth/auth');
const checkUserName = require('../../middlewares/checkUsername');
const router = Router();

router.post('/login', login);

router.post('/register', checkUserName, register);

module.exports = router;
