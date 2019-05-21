//const passport = require("../../passport");
const User = require("../models/User");
module.exports = {
  postLogin(req, res, next) {
    User.findAll().then(res => {
      console.log("nothing");
    });
    //passport.authenticate("local", {});
  }
};
