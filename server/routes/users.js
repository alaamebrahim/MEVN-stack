import express from "express";
import UsersController from "../Http/controllers/UsersController";

const router = express.Router();
const passport = require("../passport");
const userCtrll = new UsersController();

/* GET users listing. */
router.post("/login", (req, res, next) => {
  userCtrll.postLogin(req, res, next);
});

router.get(
  "/testAuth",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
      userCtrll.getTest(req, res, next);
  }
);

module.exports = router;
