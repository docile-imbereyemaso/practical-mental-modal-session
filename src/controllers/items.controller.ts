import type { Request, Response } from "express";
import {
  createItemService,
  deleteItemService,
  getAllItemsService,
  getItemByIdService,
  updateItemService,
} from "../services/items.service.js";
import { BadRequestException, NotFoundException } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const item = await createItemService({ name, description, price });
  res.status(201).json({
    success: true,
    message: "Item created successfully.",
    data: item,
  });
});
export const getAllItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await getAllItemsService();
  res.status(200).json({
    success: true,
    message: "Items retrieved successfully",
    data: items,
  });
});
export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const updatedItem = await updateItemService(req.params.id as string, {
    name,
    description,
    price,
  });
  if (!updatedItem) {
    throw new NotFoundException("Item not found.");
  }
  res.status(200).json({
    success: true,
    message: "Item updated successfully.",
    data: updatedItem,
  });
});
export const deletedItem = asyncHandler(async (req: Request, res: Response) => {
  const deletedItem = await deleteItemService(req.params.id as string);
  if (!deletedItem) throw new NotFoundException("Item not found.");
  res.status(200).json({
    success: true,
    message: "Item deleted successfully.",
  });
});
export const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const item = await getItemByIdService(req.params.id as string);
  if (!item) throw new NotFoundException("Item not found.");
  res.status(200).json({
    success: true,
    message: "Item retrieved successfully.",
    data: item,
  });
});
