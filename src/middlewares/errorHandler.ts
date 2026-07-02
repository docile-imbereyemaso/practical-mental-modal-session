import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError.js";

const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal server error.";
  res.status(statusCode).json({
    success: false,
    message,
  });
};
export default errorHandler;
