import { app, httpServer } from "../server/index";
import { registerRoutes } from "../server/routes";

let initialized = false;

export default async function handler(req: any, res: any) {
    if (!initialized) {
        await registerRoutes(httpServer, app);
        initialized = true;
    }

    app(req, res);
}
