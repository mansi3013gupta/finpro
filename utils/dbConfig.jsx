import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://neondb_owner:npg_0zBrPQc2TSsA@ep-muddy-bread-a8cbwov1-pooler.eastus2.azure.neon.tech/fin-smart?sslmode=require"
);
export const db = drizzle(sql, { schema });
