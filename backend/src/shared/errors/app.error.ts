export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly body?:  Record<string, unknown>,
  ) {
    super(message);

    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}