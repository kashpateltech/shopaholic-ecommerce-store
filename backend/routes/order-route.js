const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order-controller");
const router = express.Router();

const {
  userAuthenticated,
  authorizedRole,
} = require("../middleware/authentication");

router.route("/order/new").post(userAuthenticated, newOrder);

router.route("/order/:id").get(userAuthenticated, getSingleOrder);

router.route("/orders/me").get(userAuthenticated, myOrders);

router
  .route("/admin/orders")
  .get(userAuthenticated, authorizedRole("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(userAuthenticated, authorizedRole("admin"), updateOrder)
  .delete(userAuthenticated, authorizedRole("admin"), deleteOrder);

module.exports = router;
