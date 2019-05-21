const passport = require("../../passport");
const User = require("../../database/models/user");
const authInfo = require("../../config/auth");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Login post proccess
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  postLogin(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ error: "error", info: info });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        const loggedUser = { id: user.id, name: user.name, email: user.email };
        const token = jwt.sign(loggedUser, authInfo.jwtPassKey);
        return res.json({ success: true, loggedUser, token });
      });
    })(req, res, next);
  },
  /**
   * Test authentication
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getTest(req, res, next) {
    res.json({ done: true });
  }
};
