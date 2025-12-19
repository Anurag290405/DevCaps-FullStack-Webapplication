import { Router } from "express";
import { createClient, getClients } from "../controllers/client.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route
router.get("/clients", getClients);

// Protected admin route
router.post("/clients", verifyToken, createClient);

export default router;
