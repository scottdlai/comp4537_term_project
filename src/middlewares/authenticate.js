const passport = require('passport');

const adminOnly = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      res.status(500);
      return res.json({ error });
    }

    if (!user) {
      res.status(401);
      return res.json(info);
    }

    const { username, isAdmin } = user;

    if (!isAdmin) {
      res.status(401);
      return res.json({
        error: 'Unauthorized (user is not an admin)',
        username,
      });
    }

    next();
  })(req, res, next);
};

const anyUser = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      res.status(500);
      res.json({ error });
    }

    if (!user) {
      res.status(401);
      return res.json(info);
    }
    const { username } = user;
    res.locals = { username };
    next();
  })(req, res, next);
};

module.exports = { adminOnly, anyUser };
