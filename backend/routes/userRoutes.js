const express = require("express");
const {
  userRegistration,
  userLogin,
  logout
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(userRegistration);

router.route("/login").post(userLogin);

router.route("/logout").get(logout)

module.exports = router;
