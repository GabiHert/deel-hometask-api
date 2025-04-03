import { NextFunction, Request, Response } from "express";

/**
 * Interface representing a middleware adapter for handling errors in an Express application.
 */
export type ErrorHandlerMiddlewareAdapter = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
