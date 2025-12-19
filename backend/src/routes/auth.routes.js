import express from "express";
import { login, logout, verify } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/logout", logout);

// Protected route
router.get("/verify", verifyToken, verify);

export default router;
