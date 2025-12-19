import { Router } from "express";
import { getSuccessStories, replaceSuccessStories } from "../controllers/successStories.controller.js";

const router = Router();

router.get("/success-stories", getSuccessStories);
router.post("/success-stories", replaceSuccessStories);

export default router;
