import { API_URL } from "../../NwConfig";

export default function parseImagePath(dbPath) {
  if (!dbPath) return "";
  // If already an absolute url, base64, or blob, return as-is
  if (dbPath.startsWith("http") || dbPath.startsWith("data:") || dbPath.startsWith("blob:")) {
    return dbPath;
  }

  // Normalize stored relative paths
  let normalized = dbPath?.replace(/\\/g, "/");
  if (normalized.startsWith("uploads/")) {
    normalized = normalized.replace("uploads/", "");
  }
  const base = import.meta.env.VITE_API_URL || API_URL || "http://localhost:3000";
  return `${base}/uploads/${normalized}`;
}