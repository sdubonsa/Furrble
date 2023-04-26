const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth");

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
router.get('/logout', isLoggedIn, controller.logout);

// GET /users/swipe: Show other users
router.get('/swipe', isLoggedIn, controller.swipe);

router.put('/swipe', isLoggedIn, controller.like);

module.exports = router;
