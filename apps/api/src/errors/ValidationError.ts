import { AppError } from "./AppError.js";
import type { AppErrorOptions } from "./AppError.js";

type ValidationErrorMetaData = {};

type ValidationErrorOptions = AppErrorOptions & {
  metadata: ValidationErrorMetaData;
};

export class ValidationError extends AppError {
  constructor(options: ValidationErrorOptions) {
    super(options);
    this.name = "ValidationError";
  }
}
