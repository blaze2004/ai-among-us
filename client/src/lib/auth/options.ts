import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/config/env"
import { EdgeDBAdapter } from "../db/adapter"
import dbClient from "../db/client"

export const authOptions: NextAuthOptions={
    adapter: EdgeDBAdapter(dbClient),
    session: {
        strategy: "jwt",
    },
    theme: {
        logo: "/vercel.svg",
        brandColor: "#64748b",
    },
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }),
    ],
}