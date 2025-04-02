export class ErrorDetail {
  public readonly field: string;
  public readonly message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}

export abstract class ApplicationBaseError extends Error {
  readonly name: string;
  readonly statusCode: number;
  readonly errorDetails: ErrorDetail[];

  constructor(
    name: string,
    message: string,
    statusCode: number,
    errorDetails: ErrorDetail[] = []
  ) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
  }
}
