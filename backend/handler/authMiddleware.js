import jwt from "jsonwebtoken";
import { hasToken } from "../cache/tokenCache.js";
import { AppError } from "../domain/errors.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Bearer token is required", 401, "handler", "error"));
  }

  const token = authHeader.replace("Bearer ", "");

  if (!hasToken(token)) {
    return next(new AppError("Token is not active", 401, "cache", "error"));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    next();
  } catch (error) {
    next(new AppError("Invalid token", 401, "handler", "error"));
  }
}
