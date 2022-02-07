const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/user-controller");
const {
  userAuthenticated,
  authorizedRole,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(userAuthenticated, getUserDetails);

router.route("/password/update").put(userAuthenticated, updatePassword);

router.route("/me/update").put(userAuthenticated, updateProfile);

router
  .route("/admin/users")
  .get(userAuthenticated, authorizedRole("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(userAuthenticated, authorizedRole("admin"), getSingleUser)
  .put(userAuthenticated, authorizedRole("admin"), updateUserRole)
  .delete(userAuthenticated, authorizedRole("admin"), deleteUser);

module.exports = router;