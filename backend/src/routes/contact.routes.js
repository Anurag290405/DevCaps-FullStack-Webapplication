import { Router } from "express";
import { createContact, getContacts } from "../controllers/contact.controller.js";

const router = Router();

router.post("/contact", createContact);
router.get("/contact", getContacts);

export default router;
