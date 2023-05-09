import { getServerSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/lib/env.mjs"
import { DrizzleAdapter } from "@/lib/auth/adapter";
import { database } from "@/lib/database"
import { sessions, users } from "../database/schema";
import { InferModel } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(database),
    session: {
        strategy: "jwt",
    },
    providers: [
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: "/auth/signin",
    }
};

export const getServerSideSession = async () => await getServerSession<NextAuthOptions, { user?: InferModel<typeof users> }>(authOptions)