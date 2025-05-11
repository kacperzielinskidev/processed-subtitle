import { Request, Response, NextFunction } from "express";
import { InvalidFormatError } from "../../../domain/errors/invalid-format.error";
import { MissingDataError } from "../../../domain/errors/missing-data.error";

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,

  next: NextFunction
): void {
  console.error("Global Error Handler caught an error:", err);

  if (err instanceof InvalidFormatError) {
    res.status(400).json({
      name: err.name,
      message: err.message,
      details: err.details,
    });
    return;
  }

  if (err instanceof MissingDataError) {
    res.status(400).json({
      name: err.name,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    name: "InternalServerError",
    message: "An unexpected error occurred.",
  });
}
