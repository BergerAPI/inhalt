import cuid from "@paralleldrive/cuid2";
import { accounts, sessions, users, verificationTokens } from "@/lib/database/schema";
import { NeonDatabase } from "drizzle-orm/neon-serverless";
import { and, eq } from 'drizzle-orm';
import { Adapter, AdapterAccount } from "next-auth/adapters";

/**
 * NextAuth-Support for DrizzleORM
 * @param database The connected Drizzle-Database
 */
export function DrizzleAdapter(database: NeonDatabase): Adapter {

    /**
     * Exporting all functions required for NextAuth to work
     */
    return {
        /**
         * Creating a user with provided data
         * @param userData The data to create a user with
         */
        async createUser(userData) {
            // Creating a new user
            const rows = await database.insert(users).values({
                id: cuid.createId(),
                email: userData.email,
                emailVerified: userData.emailVerified,
                name: userData.name,
                image: userData.image,
            }).returning()

            return rows[0];
        },

        /**
         * Getting a user by their id
         * @param id The id to query for
         */
        async getUser(id: string) {
            const rows = await database
                .select()
                .from(users)
                .where(eq(users.id, id))
                .limit(1);

            return rows[0];
        },

        /**
         * Querying for a user by its email
         * @param email The email to search for
         */
        async getUserByEmail(email: string) {
            const rows = await database
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1);

            return rows[0];
        },

        /**
         * An account is always linked to a user. This function queries for the user by
         * an account-id.
         * @param providerAccountId The id of the account
         * @param provider What the account is logged in with
         */
        async getUserByAccount({ providerAccountId, provider }) {
            const rows = await database
                .select()
                .from(users)
                .innerJoin(accounts, eq(users.id, accounts.userId))
                .where(
                    and(
                        eq(accounts.providerAccountId, providerAccountId),
                        eq(accounts.provider, provider)
                    )
                )
                .limit(1);

            return rows[0]?.users ?? null;
        },

        /**
         * Updating the user object
         * @param id The id of the user to update
         * @param userData The new data
         */
        async updateUser({ id, ...userData }) {
            if (!id) throw new Error("User not found");

            // Updating the user
            const rows = await database.update(users).set(userData).where(eq(users.id, id)).returning();

            return rows[0];
        },

        /**
         * Deleting a user by its id
         * @param id The id of the user that shall be deleted
         */
        async deleteUser(id: string) {
            await database.delete(users).where(eq(users.id, id));
        },

        /**
         * Creating an account
         * @param account The info to create the database entity with
         */
        async linkAccount(account: AdapterAccount) {
            await database.insert(accounts).values({
                id: cuid.createId(),
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                userId: account.userId,
                // OpenIDTokenEndpointResponse properties
                access_token: account.access_token,
                expires_in: account.expires_in as number,
                id_token: account.id_token,
                refresh_token: account.refresh_token,
                refresh_token_expires_in: account.refresh_token_expires_in as number, // TODO: why doesn't the account type have this property?
                scope: account.scope,
                token_type: account.token_type,
            });
        },

        /**
         * Deleting an account
         * @param providerAccountId the id of the account to delete
         * @param provider The provider the account has been created with
         */
        async unlinkAccount({ providerAccountId, provider }) {
            await database
                .delete(accounts)
                .where(
                    and(
                        eq(accounts.providerAccountId, providerAccountId),
                        eq(accounts.provider, provider)
                    )
                );
        },

        /**
         * Creating a session
         * @param data The data that the session should contain
         */
        async createSession(data) {
            return database
                .insert(sessions)
                .values({
                    id: cuid.createId(),
                    sessionToken: data.sessionToken,
                    expires: data.expires,
                    userId: data.userId
                })
                .returning()
                .then(res => res[0])
        },

        /**
         * Querying for a session and user by the session token
         * @param sessionToken The session-token to look for
         */
        async getSessionAndUser(sessionToken: string) {
            const rows = await database
                .select({
                    user: users,
                    session: {
                        id: sessions.id,
                        userId: sessions.userId,
                        sessionToken: sessions.sessionToken,
                        expires: sessions.expires,
                    },
                })
                .from(sessions)
                .innerJoin(users, eq(users.id, sessions.userId))
                .where(eq(sessions.sessionToken, sessionToken))
                .limit(1);

            if (!rows[0]) return null;

            const { user, session } = rows[0];

            return {
                user,
                session: {
                    id: session.id,
                    userId: session.userId,
                    sessionToken: session.sessionToken,
                    expires: session.expires,
                },
            };
        },

        /**
         * Updating an existing session
         * @param session The data
         */
        async updateSession(session) {
            // Updating the session
            const rows = await database
                .update(sessions)
                .set(session)
                .where(eq(sessions.sessionToken, session.sessionToken))
                .returning()

            return rows[0];
        },

        /**
         * Deleting a session by its token
         * @param sessionToken The session-token to identify the session from
         */
        async deleteSession(sessionToken) {
            await database.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
        },

        /**
         * Creating a verification token
         * @param verificationToken The information to create a verification token
         */
        async createVerificationToken(verificationToken) {
            // Creating the token
            const entry = await database.insert(verificationTokens).values({
                expires: verificationToken.expires,
                identifier: verificationToken.identifier,
                token: verificationToken.token,
            }).returning()

            return entry[0];
        },

        /**
         * Validation of a token
         * @param identifier The identifier of the token
         * @param token The token to validate
         */
        async useVerificationToken({ identifier, token }) {
            // First get the token while it still exists. TODO: need to add identifier to where clause?
            const rows = await database
                .select()
                .from(verificationTokens)
                .where(eq(verificationTokens.token, token))
                .limit(1);

            if (!rows[0]) return null;

            // Then delete it.
            await database
                .delete(verificationTokens)
                .where(
                    and(
                        eq(verificationTokens.token, token),
                        eq(verificationTokens.identifier, identifier)
                    )
                );

            // Then return it.
            return rows[0];
        },
    };
}