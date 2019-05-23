import express from "express";
import UsersController from "../Http/controllers/UsersController";

const router = express.Router();
import passport from "../passport";

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
