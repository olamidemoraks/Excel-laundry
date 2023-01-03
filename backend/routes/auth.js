const express = require("express");
const { signup, signin, logout } = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").post(logout);

module.exports = router;
