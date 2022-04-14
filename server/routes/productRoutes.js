const express = require("express");
const { getAllProducts, createProduct,updateProduct, deleteProduct, getProductDetails, addProductReview, allReviewsOfProduct, deleteReviewsOfProduct } = require("../controller/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/authentication");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get(isAuthenticatedUser,authorizeRoles("admin"),getProductDetails);
router.route("/review").put(isAuthenticatedUser,addProductReview);
router.route("/reviews").get(isAuthenticatedUser,allReviewsOfProduct).delete(isAuthenticatedUser,deleteReviewsOfProduct);

module.exports = router; 