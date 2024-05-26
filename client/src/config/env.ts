import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env=createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    EDGEDB_INSTANCE: z.string(),
    EDGEDB_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_SOCKET_URL: z.string().url(),
  },
  runtimeEnv: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    EDGEDB_INSTANCE: process.env.EDGEDB_INSTANCE,
    EDGEDB_SECRET_KEY: process.env.EDGEDB_SECRET_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  },
});