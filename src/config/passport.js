const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { db, JWT_TOKEN } = require('./index');

passport.use(
  new LocalStrategy(
    {
      session: false,
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, done) => {
      // check to see if the username exists
      db('users')
        .where({ username })
        .first()
        .then((user) => {
          if (!user) return done(null, false);
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      ignoreExpiration: true,
      secretOrKey: JWT_TOKEN,
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
    },
    async ({ user: { username } }, done) => {
      try {
        const user = await db('users')
          .where({ username })
          .first(['username', 'isAdmin']);

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done({ error: err });
      }
    }
  )
);

passport.serializeUser(({ username }, done) => done(null, username));

passport.deserializeUser(async (username, done) => {
  try {
    const user = await db('users').where({ username }).first();

    return done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;