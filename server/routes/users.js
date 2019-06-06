import express from "express";
import LoginController from "../Http/controllers/LoginController";

const router = express.Router();
import passport from "../passport";
import UsersController from "../Http/controllers/UsersController";

/* login */
router.post("/login", (req, res, next) => {
  LoginController.postLogin(req, res, next);
});

/**
 * get users list
 */
router.get(
  "/get-all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    UsersController.getUsers(req, res, next);
  }
);

/**
 * get roles list
 */
router.get(
  "/roles/get-all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    UsersController.getRoles(req, res, next);
  }
);

/**
 * Add/Update user
 */
router.post(
  "/add-update-user",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    UsersController.AddUpdateUser(req, res, next);
  }
);

module.exports = router;
