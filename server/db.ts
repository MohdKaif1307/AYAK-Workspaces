import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

let pool: any = null;
let db: any = null;

const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (dbUrl) {
  console.log("[DB] Creating database pool with URL:", dbUrl.substring(0, 30) + "...");
  
  pool = new Pool({
    connectionString: dbUrl,
    // Add SSL support but allow self-signed certs (common for cloud providers)
    // Only apply in production or if explicitly needed, but typical for Vercel deployments
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  });

  // Set up error handlers for the pool
  pool.on("error", (err: any) => {
    console.error("[DB] Unexpected pool error:", err);
  });

  db = drizzle(pool, { schema });
  console.log("[DB] ✅ Database connection initialized");
} else {
  console.warn("[DB] ⚠️  No DATABASE_URL or POSTGRES_URL found - using in-memory storage");
}

export { pool, db };
