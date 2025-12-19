import { Router } from "express";
import { createSubscriber, getSubscribers } from "../controllers/subscriber.controller.js";

const router = Router();

router.post("/subscribe", createSubscriber);
router.get("/subscribe", getSubscribers);

export default router;
