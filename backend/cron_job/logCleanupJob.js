import { trimLogs } from "../repository/logRepository.js";
import { Log } from "../handler/logHandler.js";

export function startLogCleanupJob() {
  setInterval(() => {
    trimLogs(100);
    Log("backend", "debug", "cron_job", "old in-memory logs trimmed");
  }, 60 * 60 * 1000);
}
