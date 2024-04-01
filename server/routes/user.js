const express = require("express");

const verifyToken = require("../middlewares/verifyToken.js");
const { signup, login, logout } = require("../controllers/authController.js");
const { getUser } = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", verifyToken, getUser);

module.exports = router;
