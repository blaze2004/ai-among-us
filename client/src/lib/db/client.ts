import { env } from "@/config/env";
import { createClient } from "edgedb";
 
const dbClient=createClient();

export default dbClient;