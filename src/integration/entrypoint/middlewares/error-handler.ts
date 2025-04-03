import { NextFunction, Response } from "express";
import { ApplicationBaseError } from "../../../domain/errors/application-base-error";
import { ProfileRequest } from "../../../infra/server/request";
import { MiddlewareAdapter } from "../../adapters/middleware";
import { InternalServerError } from "../errors/internal-server-error";

function parseErrorToJson(err: ApplicationBaseError) {
  return {
    error: {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      errorDetails: err.errorDetails,
    },
  };
}

export const errorHandlerMiddleware: MiddlewareAdapter = (
  err: Error,
  _req: ProfileRequest,
  res: Response,
  _next: NextFunction
): void => {
  let baseError: ApplicationBaseError = new InternalServerError(err.message);
  if (err instanceof ApplicationBaseError) {
    baseError = err;
  }
  res.setHeader("Content-Type", "application/json");
  res.status(baseError.statusCode).json(parseErrorToJson(baseError));
};
