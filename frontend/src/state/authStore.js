const TOKEN_KEY = "logging_system_token";
const CREDENTIAL_KEY = "logging_system_credentials";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setCredentials(credentials) {
  localStorage.setItem(CREDENTIAL_KEY, JSON.stringify(credentials));
}

export function getCredentials() {
  const value = localStorage.getItem(CREDENTIAL_KEY);
  return value ? JSON.parse(value) : null;
}
