const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../../config');

const login = (req, res) =>
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      res.status(401);
      return res.json({ err });
    }

    const token = jwt.sign({ user }, JWT_TOKEN);

    res.status(200);
    res.json({ token });
  })(req, res);

module.exports = { login };
