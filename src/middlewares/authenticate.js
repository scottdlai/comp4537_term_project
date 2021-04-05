const passport = require('passport');

const adminOnly = async (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, { isAdmin, username }, info) => {
      if (!isAdmin || err) {
        res.status(401);
        res.json({ error: 'Unauthorized (user is not an admin)', username });
      } else {
        next();
      }
    }
  )(req, res, next);
};

module.exports = { adminOnly };
