const express = require("express");
const {
  userRegistration,
  userLogin,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
} = require("../controllers/userController");

const { authenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(userRegistration);

router.route("/login").post(userLogin);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(authenticatedUser, getUserDetails);

router.route("/password/update").put(authenticatedUser, updatePassword);

router.route("/me/update").put(authenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(authenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(authenticatedUser, authorizeRoles("admin"), getSingleUser);

module.exports = router;
