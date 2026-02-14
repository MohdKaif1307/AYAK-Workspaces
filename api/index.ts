import { app, httpServer } from "../server/index";
import { registerRoutes } from "../server/routes";

let initialized = false;

export default async function handler(req: any, res: any) {
    try {
        if (!initialized) {
            console.log("Initializing Vercel adapter...");
            await registerRoutes(httpServer, app);
            initialized = true;
            console.log("Vercel adapter initialized.");
        }

        app(req, res);
    } catch (err) {
        console.error("Vercel Handler initialization error:", err);
        res.status(500).json({ message: "Internal Server Error during initialization", error: String(err) });
    }
}
