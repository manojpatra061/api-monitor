type Meta = Record<string, unknown>;
type EngineErrorOptions = {
  message: string;
  opts?: ErrorOptions;
  meta?: Meta;
};

export class EngineError extends Error {
  public meta?: Meta;
  constructor({ message, meta, opts }: EngineErrorOptions) {
    super(message, opts);
    this.name = "EngineError";
    this.meta = meta;
  }
}
