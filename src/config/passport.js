const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { db, JWT_TOKEN, TOKEN_EXPIRATION_TIME } = require('./index');

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
            return done({ error: 'Wrong password' }, false);
          } else {
            return done(null, user);
          }
        })
        .catch((error) => {
          return done(error, false);
        });
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      ignoreExpiration: true,
      secretOrKey: JWT_TOKEN,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('token'),
    },
    async ({ user: { username }, iat }, done) => {
      if (iat + TOKEN_EXPIRATION_TIME < Date.now()) {
        return done({ error: 'Token Expired' }, false);
      }

      try {
        const user = await db('users')
          .where({ username })
          .first(['username', 'isAdmin']);

        if (!user) {
          return done({ error: 'No user found' }, false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
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
    console.log(err);
    done(err);
  }
});

module.exports = passport;
