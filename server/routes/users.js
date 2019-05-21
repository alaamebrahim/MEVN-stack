var express = require("express");
var router = express.Router();
const UsersController = require("../Http/controllers/UsersController");
const passport = require("../passport");

/* GET users listing. */
router.post("/login", (req, res, next) => {
  UsersController.postLogin(req, res, next);
});

router.get(
  "/testAuth",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    UsersController.getTest(req, res, next);
  }
);

module.exports = router;
