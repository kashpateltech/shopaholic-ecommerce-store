const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAdminProducts,
} = require("../controllers/product-controller");
const {
  userAuthenticated,
  authorizedRole,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(userAuthenticated, authorizedRole("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(userAuthenticated, authorizedRole("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(userAuthenticated, authorizedRole("admin"), updateProduct)
  .delete(userAuthenticated, authorizedRole("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
