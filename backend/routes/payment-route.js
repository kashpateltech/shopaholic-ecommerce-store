const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/payment-controller");
const router = express.Router();
const { userAuthenticated } = require("../middleware/authentication");

router.route("/payment/process").post(userAuthenticated, processPayment);

router.route("/stripeapikey").get(userAuthenticated, sendStripeApiKey);

module.exports = router;
