import { AppError } from "./AppError.js";
import type { AppErrorOptions } from "./AppError.js";

type DatabaseErrorMetadata = { query: string };

type DatabaseErrorOptions = AppErrorOptions & {
  metadata: DatabaseErrorMetadata;
};

export class DatabaseError extends AppError {
  constructor(options: DatabaseErrorOptions) {
    super(options);
    this.name = "DatabaseError";
  }
}
