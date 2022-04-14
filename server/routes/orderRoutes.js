const express = require("express");
const { createOrder, getSingleOrder, myOrder, allOrdersForAdmin, updateOrder, deleteOrder } = require("../controller/orderController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/authentication");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser,createOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrder);
router.route("/orders").get(isAuthenticatedUser,authorizeRoles("admin"),allOrdersForAdmin);
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router;