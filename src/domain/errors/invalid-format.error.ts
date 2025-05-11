export class InvalidFormatError extends Error {
  public readonly details?: any;
  constructor(message: string, details?: any) {
    super(message);
    this.name = "InvalidFormatError";
    this.details = details;
    Object.setPrototypeOf(this, InvalidFormatError.prototype);
  }
}
