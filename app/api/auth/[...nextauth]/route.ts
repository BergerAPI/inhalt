import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/lib/env.mjs"
import { DrizzleAdapter } from "@/lib/auth/adapter";
import { database } from "@/lib/database"

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };