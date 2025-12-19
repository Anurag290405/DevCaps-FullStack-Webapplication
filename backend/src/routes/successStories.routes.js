import { Router } from "express";
import { getSuccessStories, replaceSuccessStories } from "../controllers/successStories.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route
router.get("/success-stories", getSuccessStories);

// Protected admin route
router.post("/success-stories", verifyToken, replaceSuccessStories);

export default router;
