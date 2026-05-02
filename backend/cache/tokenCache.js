const activeTokens = new Set();

export function saveToken(token) {
  activeTokens.add(token);
}

export function hasToken(token) {
  return activeTokens.has(token);
}

export function removeToken(token) {
  activeTokens.delete(token);
}
