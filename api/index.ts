import { app, httpServer } from "../server/index";
import { registerRoutes } from "../server/routes";

let initialized = false;

export default async function handler(req: any, res: any) {
    try {
        if (!initialized) {
            console.log("Vercel Cold Start: Initializing routes...");
            // Only register if we haven't already
            // Note: registerRoutes might have been called if server/index.ts was misconfigured
            // But with our fix it shouldn't have.
            await registerRoutes(httpServer, app);
            initialized = true;
            console.log("Vercel adapter ready.");
        }

        // Handle the request
        app(req, res);
    } catch (err) {
        console.error("CRITICAL: Vercel Handler failure:", err);
        res.status(500).json({
            message: "Internal Server Error during initialization",
            error: String(err),
            stack: process.env.NODE_ENV === "development" ? (err as Error).stack : undefined
        });
    }
}
