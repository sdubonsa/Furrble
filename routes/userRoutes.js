const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

// GET /users/register: Send register form
router.get("/register", controller.register);

// GET /users/login: Send login form
router.get("/login", controller.login);

module.exports = router;
