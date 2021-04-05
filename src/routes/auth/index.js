const { Router } = require('express');
const { login } = require('../../controllers/auth/auth');
const router = Router();

router.post('/login', login);

router.post('/register');

module.exports = router;
