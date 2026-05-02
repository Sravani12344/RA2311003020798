export class AppError extends Error {
  constructor(message, statusCode = 500, packageName = "handler", level = "error") {
    super(message);
    this.statusCode = statusCode;
    this.packageName = packageName;
    this.level = level;
  }
}
