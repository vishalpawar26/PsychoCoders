const express = require("express");

const verifyToken = require("../middlewares/verifyToken.js");
const { signup, login } = require("../controllers/authController.js");
const { getUserById, getUserByUsername } = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUserById);
router.get("/user/:username", verifyToken, getUserByUsername);

module.exports = router;
