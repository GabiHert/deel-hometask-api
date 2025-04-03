import { NextFunction, Response } from "express";
import { MiddlewareAdapter } from "../../integration/adapters/middleware";
import { ProfileRequest } from "../server/request";

// Middleware to ensure responses are JSON
export const contentTypeMiddleware: MiddlewareAdapter = (
  _req: ProfileRequest,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Content-Type", "application/json");
  next();
};
