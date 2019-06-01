import express from "express";
import LoginController from "../Http/controllers/LoginController";

const router = express.Router();
import passport from "../passport";
import UsersController from "../Http/controllers/UsersController";

/* GET users listing. */
router.post("/login", (req, res, next) => {
  LoginController.postLogin(req, res, next);
});

router.get(
  "/get-all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
      UsersController.getUsers(req, res, next);
  }
);

router.get(
    "/roles/get-all",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        UsersController.getRoles(req, res, next);
    }
);

module.exports = router;
