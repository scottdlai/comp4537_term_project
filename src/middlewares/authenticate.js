const passport = require('passport');

const adminOnly = async (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, { isAdmin, username }, info) => {
      if (!isAdmin) {
        res.status(401);
        return res.json({
          error: 'Unauthorized (user is not an admin)',
          username,
        });
      } else if (err) {
        res.status(401);
        return res.json({ error: 'Wrong token' });
      }

      next();
    }
  )(req, res, next);
};

const anyUser = async (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, { username }, info) => {
      if (err || !username) {
        res.status(401);
        res.json({ error: 'Wrong token' });
      } else {
        res.locals = { username };
        next();
      }
    }
  )(req, res, next);
};

module.exports = { adminOnly, anyUser };
