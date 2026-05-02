import { Log } from "../handler/logHandler.js";

// In-memory demo database. Replace this module with MongoDB/PostgreSQL later.
const database = {
  users: []
};

export async function connectDatabase() {
  if (!database.users) {
    throw new Error("Database object is not initialized");
  }

  await Log("backend", "info", "db", "database connected");
  return database;
}

export function getDatabase() {
  return database;
}
