import { Log } from "./logHandler.js";

export async function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const packageName = error.packageName || "handler";
  const level = error.level || (statusCode >= 500 ? "fatal" : "error");

  await Log("backend", level, packageName, error.message || "Unexpected error");

  res.status(statusCode).json({
    message: error.message || "Internal server error"
  });
}
