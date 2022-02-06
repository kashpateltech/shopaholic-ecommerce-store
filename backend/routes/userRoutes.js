const express = require("express");
const {
  userRegistration,
  userLogin,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
} = require("../controllers/userController");

const { authenticatedUser, authorizedStaff} = require("../middleware/auth")

const router = express.Router();

router.route("/register").post(userRegistration);

router.route("/login").post(userLogin);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(authenticatedUser, getUserDetails);

module.exports = router;
