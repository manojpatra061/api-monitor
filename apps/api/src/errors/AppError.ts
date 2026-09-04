type AppErrorMetadata = Record<string, unknown>;

export type AppErrorOptions = {
  message: string;
  opts?: ErrorOptions;
  metadata?: AppErrorMetadata;
};

export class AppError extends Error {
  public metadata?: AppErrorMetadata;

  constructor({ message, opts, metadata }: AppErrorOptions) {
    super(message, opts);
    this.name = "AppError";
    this.metadata = metadata;
  }
}
