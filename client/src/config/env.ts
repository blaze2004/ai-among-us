import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env=createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    AUTH_EDGEDB_DSN: z.string().url(),
  },
  runtimeEnv: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    AUTH_EDGEDB_DSN: process.env.AUTH_EDGEDB_DSN,
  },
});