import { Router } from "express";
import { createContact, getContacts } from "../controllers/contact.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route
router.post("/contact", createContact);

// Protected admin route
router.get("/contact", verifyToken, getContacts);

export default router;
