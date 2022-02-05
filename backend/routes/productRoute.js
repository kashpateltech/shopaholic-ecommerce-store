const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const express = require("express");
const { authenticatedUser, authorizedStaff } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(authenticatedUser, authorizedStaff("admin"), createProduct);
router.route("/product/:id").put(authenticatedUser,authorizedStaff("admin"),  updateProduct);
router.route("/product/:id").delete(authenticatedUser, authorizedStaff("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router;
