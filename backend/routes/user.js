const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/users.js");

// Sign Up API
// POST /api/users/signup
router.post("/signup", wrapAsync(userController.signUp));

// Login API
// POST /api/users/login
router.post("/login", wrapAsync(userController.logIn));

// Logout API
// GET /api/users/logout
router.get("/logout", userController.logOut);

module.exports = router;