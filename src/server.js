import express from "express";
import fs from "fs/promises";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuid } from "uuid";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = path.join(__dirname, "database", "data.json");

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error === "ENOENT") {
      throw new Error("DAta not found.");
    }
    throw error;
  }
}
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/items", async (req, res) => {
  try {
    const items = await readData();
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
});
app.get("/items/:id", async (req, res) => {
  try {
    const items = await readData();
    const item = items.find((item) => item.id === req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found.`,
      });
      res.status(200).json({
        success: true,
        data: item,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
});
app.post("/items", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing fields are required.",
      });
    }
    if (isNaN(Number(price))) {
      return res.status(400).json({
        success: false,
        message: "Price must be valid number",
      });
    }
    const items = await readData();
    const newItem = {
      id: uuid(),
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      date: new Date().toISOString(),
    };
    items.push(newItem);
    await writeData(items);
    res.status(201).json({
      success: true,
      message: "New item is created successfully.",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
});
app.put("/items/:id", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const items = await readData();
    const index = items.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }
    if (isNaN(Number(price))) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number",
      });
    }
    const updatedItem = {
      ...items[index],
      name: name !== undefined ? name.trim() : items[index].name,
      description:
        description !== undefined
          ? description.trim()
          : items[index].description,
      price: price !== undefined ? Number(price) : items[index].price,
      updatedAt: new Date().toISOString(),
    };
    items[index] = updatedItem;
    await writeData(items);
    res.status(200).json({
      success: true,
      message: "Item updated successfully.",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});
app.delete("/items/:id", async (req, res) => {
  try {
    const items = await readData();
    const index = items.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }
    items.splice(index, 1);
    await writeData(items);
    res.status(200).json({
      success: true,
      message: "Item deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
});
app.listen(3000, () => {
  console.log(`Server is running on port: 3000`);
});
