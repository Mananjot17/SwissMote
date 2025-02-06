import express from "express";
import { handleLogin, handleRegister } from "../controllers/authController.js";

const router = express.Router();

// Register user
router.post("/register", handleRegister);

// Login user
router.post("/login", handleLogin);

export default router;
