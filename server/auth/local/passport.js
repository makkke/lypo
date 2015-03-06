var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (Account, config) {
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function (username, password, done) {
      Account
        .findOne()
        .or([{ email: username }, { username: username }])
        .exec(function (err, account) {
        if(err) return done(err);

        if(!account) {
          return done(null, false, { message: 'Invalid username or password' });
        }
        if(!account.authenticate(password)) {
          return done(null, false, { message: 'Invalid username or password' });
        }
        return done(null, account);
      });
    }
  ));
};