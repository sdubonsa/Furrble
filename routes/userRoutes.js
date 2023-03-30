const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();
const userModel = require("../models");


// GET /users/register: Send register form
router.get("/register", controller.register);
router.post("/register", controller.create);
// POST /users/login authenticate user
router.post('/login', controller.authenticate);


// GET /users/login: Send login form
router.get("/login", controller.login);

module.exports = router;
