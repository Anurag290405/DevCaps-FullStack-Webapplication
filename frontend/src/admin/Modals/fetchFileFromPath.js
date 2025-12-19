import parseImagePath from "./parseImagePath";

export default async function fetchFileFromPath(filePath) {
  try {
    const url = parseImagePath(filePath);
    const response = await fetch(url);
    const blob = await response.blob();

    const filename = filePath.split(/[/\\]/).pop();
    return new File([blob], filename, { type: blob.type });
  } catch (err) {
    console.error("Error fetching file:", err);
    return null;
  }
}