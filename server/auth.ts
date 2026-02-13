import type { Express, RequestHandler } from "express";

// Simple auth stub - since auth is disabled by default
export let isAuthEnabled = false;

export function setupAuth(app: Express) {
  console.log("Auth is disabled - using development mode");
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  // If auth is disabled, allow all requests
  if (!isAuthEnabled) {
    return next();
  }
  
  // Placeholder for future auth implementation
  return res.status(401).json({ message: "Unauthorized" });
};

export function registerAuthRoutes(app: Express): void {
  // Get current authenticated user
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    // When auth is disabled, return null
    if (!isAuthEnabled) {
      return res.json(null);
    }
    res.status(401).json({ message: "Unauthorized" });
  });
}
