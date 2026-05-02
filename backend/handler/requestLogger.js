import { Log } from "./logHandler.js";

export function requestLogger(req, res, next) {
  const startedAt = Date.now();

  Log("backend", "info", "route", `${req.method} ${req.originalUrl}`).catch(() => {});

  res.on("finish", () => {
    const duration = Date.now() - startedAt;
    const level = res.statusCode >= 400 ? "warn" : "info";
    Log("backend", level, "handler", `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`).catch(() => {});
  });

  next();
}
