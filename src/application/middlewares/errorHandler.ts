import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomError } from "../errors/CustomError";

export function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      data: {
        name: err.name,
        message: err.message,
        issues: err.issues,
        stack: err.stack,
      },
    });
    return;
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      data: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
    return;
  }

  res.status(500).json({
    success: false,
    data: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  });

  next();
}
