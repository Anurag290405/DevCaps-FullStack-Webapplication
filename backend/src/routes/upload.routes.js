import express from "express";
import upload from "../middlewares/imageUpload.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST /api/upload - Upload cropped image (protected)
router.post("/upload", verifyToken, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Return the file path relative to public folder
    const filePath = `/uploads/images/${req.file.filename}`;

    res.json({
      success: true,
      filePath,
      filename: req.file.filename,
      message: "Image uploaded successfully"
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default router;
