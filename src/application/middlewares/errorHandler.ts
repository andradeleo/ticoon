import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({ message: "Bad request" });
    return;
  }

  res.status(409).json({ message: err.message });

  next();
}
