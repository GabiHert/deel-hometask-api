import { NextFunction, Request, Response } from "express";
import { ApplicationBaseError } from "../../../domain/errors/application-base-error";
import { ErrorHandlerMiddlewareAdapter } from "../../adapters/error-handler-middleware";
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

export class ErrorHandler implements ErrorHandlerMiddlewareAdapter {
  handle(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    let baseError: ApplicationBaseError = new InternalServerError(err.message);
    if (err instanceof ApplicationBaseError) {
      baseError = err;
    }
    res.status(baseError.statusCode).json(parseErrorToJson(baseError));
  }
}
