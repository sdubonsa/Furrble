const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

// GET /users/register: Send register form
router.get("/register", controller.register);
router.post("/register", controller.create);

// GET /users/login: Send login form
router.get("/login", controller.login);

// POST /users/login authenticate user
router.post('/login', controller.authenticate);

// GET /users/profile: Show user profile
router.get('/profile', controller.profile);

// GET /users/logout: Logout user
router.get('/logout', controller.logout);

// GET /users/swipe: Show other users
router.get('/swipe', controller.swipe);

router.put('/swipe', controller.like);

module.exports = router;
