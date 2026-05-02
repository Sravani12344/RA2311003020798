const logs = [];

export function saveLog(log) {
  const savedLog = {
    id: logs.length + 1,
    timestamp: new Date().toISOString(),
    ...log
  };

  logs.unshift(savedLog);
  return savedLog;
}

export function findLogs() {
  return logs;
}

export function trimLogs(maxLogs) {
  if (logs.length > maxLogs) {
    logs.splice(maxLogs);
  }
}
