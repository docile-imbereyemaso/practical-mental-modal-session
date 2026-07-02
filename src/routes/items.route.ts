import { Router } from "express";
import {
  createItem,
  deletedItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/items.controller.js";

const router = Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deletedItem);
export default router;
