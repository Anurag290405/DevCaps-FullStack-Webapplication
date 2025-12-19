import { Router } from "express";
import { createClient, getClients } from "../controllers/client.controller.js";

const router = Router();

router.post("/clients", createClient);
router.get("/clients", getClients);

export default router;
