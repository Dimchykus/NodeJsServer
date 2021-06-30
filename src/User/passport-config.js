const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./userModel');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password'
    },
    (username, password, done) => {
      console.log(username, password);
      User.findOne({ name: username })
        .lean()
        .exec((err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done({ message: 'Incorect username.' });
          }
          if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          }
          return done(null, false, { message: 'Incorrect password.' });
        });
    }
  )
);

module.exports = passport;
