export const allowedStacks = ["backend", "frontend"];
export const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
export const allowedBackendPackages = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service"
];

export function validateLogInput(stack, level, packageName, message) {
  if (!allowedStacks.includes(stack)) {
    return "Invalid stack value";
  }

  if (!allowedLevels.includes(level)) {
    return "Invalid level value";
  }

  if (stack === "backend" && !allowedBackendPackages.includes(packageName)) {
    return "Invalid backend package value";
  }

  if (!message || typeof message !== "string") {
    return "Message must be a non-empty string";
  }

  return null;
}
