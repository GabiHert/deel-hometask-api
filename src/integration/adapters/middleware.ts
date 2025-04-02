import { NextFunction, Request, Response } from "express";

/**
 * Interface representing an authorization middleware.
 *
 * This middleware is responsible for handling authorization logic
 * for incoming requests. It processes the request, response, and
 * next function to determine if the request should proceed.
 */
export interface MiddlewareAdapter {
  handle(req: Request, res: Response, next: NextFunction): void;
}
