import { validateLogInput } from "../domain/logRules.js";
import { saveLog } from "../repository/logRepository.js";

const LOG_API_URL = process.env.LOG_API_URL || "http://20.207.122.201/evaluation-service/logs";

export async function Log(stack, level, packageName, message) {
  const normalizedLog = {
    stack: String(stack || "").toLowerCase(),
    level: String(level || "").toLowerCase(),
    package: String(packageName || "").toLowerCase(),
    message
  };

  const validationError = validateLogInput(
    normalizedLog.stack,
    normalizedLog.level,
    normalizedLog.package,
    normalizedLog.message
  );

  if (validationError) {
    throw new Error(validationError);
  }

  const savedLog = saveLog(normalizedLog);

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizedLog),
      signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) {
      console.warn(`External logging API failed with status ${response.status}`);
    }
  } catch (error) {
    console.warn(`External logging API unreachable: ${error.message}`);
  }

  return savedLog;
}
