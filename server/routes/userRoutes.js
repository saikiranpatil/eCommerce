const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getSingleUserByAdmin, getAllUsersByAdmin, updateUserRole, deleteUserByAdmin } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsersByAdmin)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUserByAdmin).put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserByAdmin);

module.exports = router;