import { NextFunction, Response } from "express";
import { ProfileRequest } from "../../infra/server/request";

/**
 * Interface representing an authorization middleware.
 *
 * This middleware is responsible for handling authorization logic
 * for incoming requests. It processes the request, response, and
 * next function to determine if the request should proceed.
 */
export type MiddlewareAdapter = (
  req: ProfileRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;
