import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "versions.json");

export function getVersions() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export function saveVersion(entry) {
  const versions = getVersions();
  versions.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(versions, null, 2));
}

export function getLastText() {
  const versions = getVersions();
  if (versions.length === 0) return "";
  return versions[versions.length - 1].finalText || "";
}
