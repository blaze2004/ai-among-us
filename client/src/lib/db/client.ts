import { env } from "@/config/env";
import { createClient } from "edgedb";
 
const dbClient=createClient({ dsn: env.AUTH_EDGEDB_DSN });

export default dbClient;