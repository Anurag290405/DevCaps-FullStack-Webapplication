import { Router } from "express";
import { createSubscriber, getSubscribers } from "../controllers/subscriber.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route
router.post("/subscribe", createSubscriber);

// Protected admin route
router.get("/subscribe", verifyToken, getSubscribers);

export default router;
