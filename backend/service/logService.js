import { AppError } from "../domain/errors.js";
import { validateLogInput } from "../domain/logRules.js";
import { Log } from "../handler/logHandler.js";
import { findLogs } from "../repository/logRepository.js";

export async function submitLog(payload) {
  const packageName = payload.package;
  const validationError = validateLogInput(payload.stack, payload.level, packageName, payload.message);

  if (validationError) {
    throw new AppError(validationError, 400, "service", "error");
  }

  return Log(payload.stack, payload.level, packageName, payload.message);
}

export function getLogs() {
  return findLogs();
}
