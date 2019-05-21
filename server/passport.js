const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./database/models/user");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const authInfo = require("./config/auth");

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    where: {
      id: id
    }
  }).then((user, err) => {
    if (err) return done(err);

    // Check that the user is not disabled or deleted
    if (!user) return done(null, false);

    return done(null, user);
  });
});

// Local strateg
const local = passport.use(
  new LocalStrategy(
    {
      usernameField: "user",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, user, password, done) {
      return User()
        .findOne({
          where: {
            name: user
          }
        })
        .then((user, err) => {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, {
              message: "Incorrect username. ".user
            });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        });
    }
  )
);

// JWT strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = authInfo.jwtPassKey;
// opts.issuer = authInfo.issuer;
// opts.audience = authInfo.audience;

const jwt = passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User()
      .findOne({
        where: {
          id: jwt_payload.id
        }
      })
      .then((user, err) => {
        if (err) {
          console.log(err);
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  })
);

module.exports = local;
module.exports = jwt;
