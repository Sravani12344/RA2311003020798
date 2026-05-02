import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { saveToken } from "../cache/tokenCache.js";
import { AppError } from "../domain/errors.js";
import { createUser, findUserByClientCredentials, findUserByEmail } from "../repository/userRepository.js";
import { Log } from "../handler/logHandler.js";

export async function registerUser(payload) {
  const { email, name, rollNo, accessCode } = payload;

  if (!email || !name || !rollNo || !accessCode) {
    throw new AppError("email, name, rollNo, and accessCode are required", 400, "service", "error");
  }

  if (findUserByEmail(email)) {
    throw new AppError("Email is already registered", 409, "repository", "error");
  }

  const user = createUser({
    id: randomUUID(),
    email,
    name,
    rollNo,
    accessCode,
    clientID: randomUUID(),
    clientSecret: randomUUID()
  });

  await Log("backend", "info", "service", `registered user ${rollNo}`);

  return {
    message: "Registration successful",
    clientID: user.clientID,
    clientSecret: user.clientSecret
  };
}

export async function loginUser(payload) {
  const { clientID, clientSecret } = payload;

  if (!clientID || !clientSecret) {
    throw new AppError("clientID and clientSecret are required", 400, "service", "error");
  }

  const user = findUserByClientCredentials(clientID, clientSecret);

  if (!user) {
    throw new AppError("Invalid client credentials", 401, "repository", "error");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, rollNo: user.rollNo },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "1h" }
  );

  saveToken(token);
  await Log("backend", "info", "service", `login successful for ${user.rollNo}`);

  return {
    message: "Login successful",
    token
  };
}
