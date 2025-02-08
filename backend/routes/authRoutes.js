import express from "express";
import {
  handleLogin,
  handleLogout,
  handleRegister,
} from "../controllers/authController.js";

const router = express.Router();

// Register user
router.post("/register", handleRegister);

// Login user
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

export default router;
