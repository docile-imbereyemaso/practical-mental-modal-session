import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs/promises";
import type { Item } from "../types/items.interface.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = path.join(__dirname, "..", "data", "index.json");

export const readData = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
export const writeData = async (data: Item[]) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};
