const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_TOKEN, db } = require('../../config');

const login = (req, res) =>
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      res.status(401);
      return res.json(err);
    }

    const token = jwt.sign({ user, iat: Date.now() }, JWT_TOKEN);

    res.status(200);
    res.json({ token });
  })(req, res);

const register = async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await db('users').insert({ username, password: hash }, [
      'username',
      'isAdmin',
    ]);

    const token = jwt.sign({ user, iat: Date.now() }, JWT_TOKEN);

    res.status(200);
    res.json({ token });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};

module.exports = { login, register };
