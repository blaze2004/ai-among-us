import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/config/env"
import { EdgeDBAdapter } from "@auth/edgedb-adapter"
import { createClient } from "edgedb"
 
const dbClient=createClient({ dsn: env.AUTH_EDGEDB_DSN });

export const authOptions: NextAuthOptions={
    adapter: EdgeDBAdapter(dbClient),
    session: {
        strategy: "jwt",
    },
    theme: {
        logo: "/logo.svg",
        brandColor: "#000000",
    },
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }),
    ],
}