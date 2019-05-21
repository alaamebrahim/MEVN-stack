var express = require("express");
var router = express.Router();
const UsersController = require("../database/controllers/UsersController");

/* GET users listing. */
router.get("/login", (req, res, next) => {
  UsersController.postLogin(req, res, next);
});

module.exports = router;
