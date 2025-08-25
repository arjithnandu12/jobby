const express = require('express');
const router = express.Router();

const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateTokenHandler = require("../middleware/validateTokenHandler");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/current", validateTokenHandler, currentUser);

module.exports = router;
