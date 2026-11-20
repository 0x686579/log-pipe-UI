export const SERVICES = ["auth-service", "payment-api", "user-service", "notification-svc", "api-gateway"];

export const LEVELS = [
  { level: "INFO", weight: 0.55 },
  { level: "WARN", weight: 0.20 },
  { level: "ERROR", weight: 0.15 },
  { level: "DEBUG", weight: 0.10 },
];

export const MESSAGES: Record<string, string[]> = {
  INFO: ["User authenticated successfully", "Payment processed", "Request completed in 45ms", "Cache hit for user profile", "Health check passed"],
  WARN: ["Rate limit approaching threshold", "Slow query detected (2.3s)", "Deprecated API endpoint called", "Memory usage above 80%"],
  ERROR: ["Failed to connect to database", "Payment gateway timeout", "Invalid JWT token", "Unhandled exception in worker", "Third-party API returned 500"],
  DEBUG: ["Incoming request: POST /api/login", "Query params: { page: 1, limit: 20 }", "Cache miss, fetching from DB", "Serializing response payload"],
};

