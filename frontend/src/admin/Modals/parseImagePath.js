import { API_URL } from "../../NwConfig";

export default function parseImagePath(dbPath) {
  if (!dbPath) return "";
  // If already an absolute url or base64, return as-is
  if (dbPath.startsWith("http") || dbPath.startsWith("data:")) {
    return dbPath;
  }

  // Normalize stored relative paths
  let normalized = dbPath?.replace(/\\/g, "/");
  if (normalized.startsWith("uploads/")) {
    normalized = normalized.replace("uploads/", "");
  }

  return `${API_URL}/uploads/${normalized}`;
}