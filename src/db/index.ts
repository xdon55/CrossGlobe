import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

let pool: Pool | undefined;
let dbClient: ReturnType<typeof drizzle> | undefined;

function getPool() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  if (!pool) {
    pool = new Pool({ connectionString: databaseUrl });
  }
  return pool;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    if (!dbClient) {
      dbClient = drizzle(getPool());
    }
    return (dbClient as any)[prop];
  },
});
