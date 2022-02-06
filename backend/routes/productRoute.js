const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts
} = require("../controllers/productController");
const express = require("express");
const { authenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(authenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/products/new")
  .post(authenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(authenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(authenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(authenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(authenticatedUser, deleteReview);

module.exports = router;
