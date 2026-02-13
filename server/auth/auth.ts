import type { Express, RequestHandler } from "express";

// Simple auth - no authentication required for development
export async function setupAuth(app: Express) {
  console.log("Auth setup skipped - running in personal mode");
  // No auth setup needed for personal development
}

export function getSession() {
  // No session middleware needed for personal mode
  return (req: any, res: any, next: any) => next();
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  // Allow all requests - personal mode
  return next();
};
