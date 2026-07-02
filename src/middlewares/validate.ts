import { NextFunction, Request, Response } from "express";
import { itemSchema } from "../types/items.interface.js";
import { BadRequestException } from "../utils/appError.js";

export const validateCreateSchema = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = itemSchema.safeParse(req.body);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message || "Invalid input.";
    throw new BadRequestException(firstError);
  }
  req.body = result.data;
  next();
};
export const validateUpdateSchema = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = itemSchema.partial().safeParse(req.body);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message || "Invalid input data.";
    throw new BadRequestException(firstError);
  }
  req.body = result.data;
  next();
};
