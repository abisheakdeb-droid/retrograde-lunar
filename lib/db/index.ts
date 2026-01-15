
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
// Import all schema definitions
import * as schema from "./schema";

export const db = drizzle(sql, { schema });
