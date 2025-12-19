import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDb from "./src/config/db.js";
import projectsRouter from "./src/routes/projects.routes.js";
import clientsRouter from "./src/routes/clients.routes.js";
import contactRouter from "./src/routes/contact.routes.js";
import subscribeRouter from "./src/routes/subscribe.routes.js";
import successStoriesRouter from "./src/routes/successStories.routes.js";
import uploadRouter from "./src/routes/upload.routes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173" ,"https://devcapsbyanurag.vercel.app" , "https://devcaps.onrender.com"],
  credentials: true
}));

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Allow larger JSON bodies for base64 images from admin uploads
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.get("/", (_req, res) => {
  res.status(200).json({ message: "DevCaps backend is running" });
});

app.use("/api", projectsRouter);
app.use("/api", clientsRouter);
app.use("/api", contactRouter);
app.use("/api", subscribeRouter);
app.use("/api", successStoriesRouter);
app.use("/api", uploadRouter);

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

  
