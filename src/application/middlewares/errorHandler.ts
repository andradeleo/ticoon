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
    res.status(400).json({ message: err.issues });
    return;
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: err.message });

  next();
}
