import { app, httpServer } from "../server/index";
import { registerRoutes } from "../server/routes";

let initialized = false;
let initError: string | null = null;

export default async function handler(req: any, res: any) {
    try {
        if (!initialized) {
            console.log(`[Vercel] Cold Start at ${new Date().toISOString()}`);
            console.log("[Vercel] Environment:", {
                NODE_ENV: process.env.NODE_ENV,
                HAS_DB_URL: !!process.env.DATABASE_URL || !!process.env.POSTGRES_URL,
                VERCEL_ENV: process.env.VERCEL_ENV,
            });

            try {
                // Register routes and seed database - MUST complete before serving
                await registerRoutes(httpServer, app);
                initialized = true;
                console.log("[Vercel] ✅ Routes registered and database seeded successfully");
            } catch (initErr: any) {
                initError = String(initErr);
                console.error("[Vercel] ❌ Initialization failed:", initErr);
                initialized = true; // Mark as initialized to avoid retry loop
                
                return res.status(503).json({
                    message: "Service temporarily unavailable",
                    error: "Database initialization failed",
                    details: process.env.NODE_ENV === "development" ? initErr.message : undefined
                });
            }
        }

        if (initError) {
            return res.status(503).json({
                message: "Service temporarily unavailable",
                error: "Previous initialization failed"
            });
        }

        // Standard Express request handling
        app(req, res);
    } catch (err) {
        console.error("[Vercel] Request handling crash:", err);
        res.status(500).json({
            message: "Internal Server Error",
            error: String(err),
            tip: "Check Vercel logs for details."
        });
    }
}
