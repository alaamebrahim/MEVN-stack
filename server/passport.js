var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      console.info("trying to authenticate user");
      return done(null, false, { message: "Incorrect username." });
    })
  );
};
