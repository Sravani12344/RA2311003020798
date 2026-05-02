import { getLogs, submitLog } from "../service/logService.js";

export async function createLog(req, res, next) {
  try {
    const log = await submitLog(req.body);
    res.status(201).json({ message: "Log submitted", log });
  } catch (error) {
    next(error);
  }
}

export async function listLogs(req, res, next) {
  try {
    res.json({ logs: getLogs() });
  } catch (error) {
    next(error);
  }
}
