const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, addProductReview, allReviewsOfProduct, deleteReviewsOfProduct, getAllProductsForAdmin } = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/product/new").post(isAuthenticatedUser, createProduct);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAllProductsForAdmin);
router.route("/user/product/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct).get(isAuthenticatedUser, getProductDetails);
router.route("/review").put(isAuthenticatedUser, addProductReview);
router.route("/reviews").get(isAuthenticatedUser, allReviewsOfProduct).delete(isAuthenticatedUser, deleteReviewsOfProduct);

module.exports = router; 