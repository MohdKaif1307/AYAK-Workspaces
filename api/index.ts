import { app, startServer } from "../server/index";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Verify routes are registered
// In server/index.ts, registerRoutes is called inside startServer
// We need to ensure routes are registered but WITHOUT listening.
// Since refactoring separated startServer, we might need to manually register routes here
// OR modify startServer to optionally skip listening.
//
// Accessing server/index.ts export:
// The refactor exported `startServer` but didn't separate registration logic cleanly enough 
// for pure import usage without side effects if we just call startServer.
// However, looking at server/index.ts:
// `const app = express()` is at top level.
// `startServer` calls `registerRoutes`.
// So we need to ensure `registerRoutes` is called.

// We need a way to initialize the app without listening.
// We can assume the refactor in validation step handled the "if (process.argv...)" check so it doesn't auto-listen on import.
// Now we just need to initialize the routes.

// BUT `startServer` in `server/index.ts` ALSO calls `httpServer.listen`. 
// We should probably have split `startServer` into `initApp` and `listen`.
// Since I just modified it to `startServer` which does both... I should probably fix `startServer` or import `registerRoutes` directly.

// Check `server/index.ts` imports:
// import { registerRoutes } from "./routes";
// import { httpServer } from ...;

import { registerRoutes } from "../server/routes";
import { app, httpServer } from "../server/index";

let initialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!initialized) {
        await registerRoutes(httpServer, app);
        initialized = true;
    }

    app(req as any, res as any);
}
