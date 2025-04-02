import { NextFunction, Request, Response } from "express";

/**
 * Interface representing a middleware adapter for handling errors in an Express application.
 */
export interface ErrorHandlerMiddlewareAdapter {
  handle(err: Error, req: Request, res: Response, next: NextFunction): void;
}
