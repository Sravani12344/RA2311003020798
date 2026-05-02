import dotenv from "dotenv";
import { createApp } from "./app.js";
import { startLogCleanupJob } from "./cron_job/logCleanupJob.js";
import { connectDatabase } from "./db/database.js";
import { Log } from "./handler/logHandler.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();

    const app = createApp();
    startLogCleanupJob();

    app.listen(PORT, () => {
      Log("backend", "info", "handler", `server running on port ${PORT}`);
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    await Log("backend", "fatal", "db", "Critical database connection failure.");
    console.error(error);
    process.exit(1);
  }
}

startServer();
