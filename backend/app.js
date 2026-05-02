import express from "express";
import cors from "cors";
import authRoutes from "./route/authRoutes.js";
import logRoutes from "./route/logRoutes.js";
import { requestLogger } from "./handler/requestLogger.js";
import { errorMiddleware } from "./handler/errorMiddleware.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" }));
  app.use(express.json());
  app.use(requestLogger);

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/logs", logRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use(errorMiddleware);

  return app;
}
