import { getDatabase } from "../db/database.js";

export function createUser(user) {
  const db = getDatabase();
  db.users.push(user);
  return user;
}

export function findUserByEmail(email) {
  const db = getDatabase();
  return db.users.find((user) => user.email === email);
}

export function findUserByClientCredentials(clientID, clientSecret) {
  const db = getDatabase();
  return db.users.find(
    (user) => user.clientID === clientID && user.clientSecret === clientSecret
  );
}
