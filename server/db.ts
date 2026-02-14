import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let pool: any = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Add SSL support but allow self-signed certs (common for cloud providers)
    // Only apply in production or if explicitly needed, but typical for Vercel deployments
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  });
  db = drizzle(pool, { schema });
}

export { pool, db };
