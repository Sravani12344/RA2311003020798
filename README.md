# Full-Stack Logging System

This project contains:

- `backend/` - Node.js + Express API
- `frontend/` - React + Vite app

## Run

```bash
npm run install:all
npm run dev
```

Backend runs on `http://localhost:5000`.
Frontend runs on `http://localhost:5173`.

## Backend API Calls

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"student@example.com\",\"name\":\"Student\",\"rollNo\":\"RA2311003020798\",\"accessCode\":\"abc123\"}"
```

Login with generated credentials:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"clientID\":\"YOUR_CLIENT_ID\",\"clientSecret\":\"YOUR_CLIENT_SECRET\"}"
```

Read local log history:

```bash
curl http://localhost:5000/api/logs \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Send a log through the backend:

```bash
curl -X POST http://localhost:5000/api/logs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "{\"stack\":\"backend\",\"level\":\"error\",\"package\":\"handler\",\"message\":\"received string, expected bool\"}"
```

## Authentication Flow

1. User registers with `email`, `name`, `rollNo`, and `accessCode`.
2. Backend creates `clientID` and `clientSecret`.
3. User logs in with `clientID` and `clientSecret`.
4. Backend returns a Bearer token.
5. Frontend stores the token and attaches it to API requests automatically.

## Logging Flow

Use:

```js
Log("backend", "error", "handler", "received string, expected bool");
Log("backend", "fatal", "db", "Critical database connection failure.");
```

Invalid `stack`, `level`, and backend `package` values are rejected before sending to the external logging API.
