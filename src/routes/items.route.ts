import { Router } from "express";
import {
  createItem,
  deletedItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/items.controller.js";
import {
  validateCreateSchema,
  validateUpdateSchema,
} from "../middlewares/validate.js";

const router = Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", validateCreateSchema, createItem);
router.put("/:id", validateUpdateSchema, updateItem);
router.delete("/:id", deletedItem);
export default router;
