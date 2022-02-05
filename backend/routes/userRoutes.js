const express = require("express");
const { userRegistration } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(userRegistration);

module.exports = router;
