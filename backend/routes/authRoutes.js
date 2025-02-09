import express from "express"; // Import express to create the router
import {
  handleLogin,
  handleLogout,
  handleRegister,
} from "../controllers/authController.js"; // Import authentication-related controller functions

const router = express.Router(); // Create a new router instance

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", handleRegister);

// @route   POST /api/auth/login
// @desc    Authenticate user and return token
// @access  Public
router.post("/login", handleLogin);

// @route   POST /api/auth/logout
// @desc    Log out the user by clearing the JWT cookie
// @access  Public
router.post("/logout", handleLogout);

export default router; // Export the router to be used in the main app
