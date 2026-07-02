export class AppError extends Error {
  public readonly statusCode: number;
  public readonly success: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundException extends AppError {
  constructor(message: string = "Item not found.") {
    super(message, 404);
  }
}
export class BadRequestException extends AppError {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}
