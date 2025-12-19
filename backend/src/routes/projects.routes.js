import { Router } from "express";
import {
	createProject,
	getProjects,
	updateProject,
	deleteProject
} from "../controllers/project.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route
router.get("/projects", getProjects);

// Protected admin routes
router.post("/projects", verifyToken, createProject);
router.put("/projects/:id", verifyToken, updateProject);
router.delete("/projects/:id", verifyToken, deleteProject);

export default router;
