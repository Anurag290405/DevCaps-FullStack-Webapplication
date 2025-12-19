import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Factory function to create multer upload for a given folder
export const upload = (folderName = "default") => {
  // Set up multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, `../../uploads/${folderName}`);

      // Create folder if it doesn't exist
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = file.fieldname + "_" + Date.now() + ext;
      cb(null, filename);
    },
  });

  // Return multer instance
  return multer({
    storage,
    limits: {
      fileSize: 4 * 1024 * 1024, // 4MB
    },
  });
};
