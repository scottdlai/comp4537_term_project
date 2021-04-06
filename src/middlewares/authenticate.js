const passport = require('passport');

const adminOnly = async (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (error, { isAdmin, username }, info) => {
      if (error) {
        res.status(401);
        return res.json({ error });
      }

      if (!isAdmin) {
        res.status(401);
        return res.json({
          error: 'Unauthorized (user is not an admin)',
          username,
        });
      }

      next();
    }
  )(req, res, next);
};

const anyUser = async (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (error, { username }, info) => {
      if (err || !username) {
        res.status(401);
        res.json({ error });
      } else {
        res.locals = { username };
        next();
      }
    }
  )(req, res, next);
};

module.exports = { adminOnly, anyUser };
