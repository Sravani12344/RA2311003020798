import express from "express";
import { createLog, listLogs } from "../controller/logController.js";
import { authMiddleware } from "../handler/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", listLogs);
router.post("/", createLog);

export default router;
