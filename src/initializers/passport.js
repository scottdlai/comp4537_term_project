const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const { JWT_TOKEN, db } = require('../config');

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
  new BearerStrategy({ session: false }, async (token, done) => {
    const decodedToken = jwt.decode(token, JWT_TOKEN);
    const username = decodedToken && decodedToken.username;
    const expires = decodedToken && new Date(decodedToken.expirationDate);

    if (expires > Date.now()) {
      try {
        const user = await db('users').where({ username }).first();

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
    return done(null, false);
  })
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
