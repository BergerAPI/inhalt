import {
    index,
    integer,
    pgTable, text, timestamp, uniqueIndex, varchar
} from "drizzle-orm/pg-core";

export const projects = pgTable(
    "projects",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        owner_id: varchar("owner_id", { length: 191 }).notNull().references(() => users.id),
        name: text("name").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
    }, (project) => ({
        nameIndex: index("projects__name__idx").on(project.name)
    })
)

export const models = pgTable(
    "models",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        project_id: varchar("project_id", { length: 191 }).notNull().references(() => projects.id),
        name: text("name").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
    }, (model) => ({
        nameIndex: index("models__name__idx").on(model.name)
    })
)

export const modelKeys = pgTable(
    "models_keys",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        model_id: varchar("model_id", { length: 191 }).notNull().references(() => models.id),
        name: text("name").notNull(),
        type: text("type").notNull(),
    }, (model) => ({
        nameIndex: index("models__name__idx").on(model.name)
    })
)

export const users = pgTable(
    "users",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        name: varchar("name", { length: 191 }),
        email: varchar("email", { length: 191 }).notNull(),
        emailVerified: timestamp("emailVerified"),
        image: varchar("image", { length: 191 }),
        created_at: timestamp("created_at").notNull().defaultNow(),
    },
    (user) => ({
        emailIndex: uniqueIndex("users__email__idx").on(user.email),
    })
);

/**
 * Required for NextAuth.js
 */
export const accounts = pgTable(
    "accounts",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        userId: varchar("userId", { length: 191 }).notNull(),
        type: varchar("type", { length: 191 }).notNull(),
        provider: varchar("provider", { length: 191 }).notNull(),
        providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
        access_token: text("access_token"),
        expires_in: integer("expires_in"),
        id_token: text("id_token"),
        refresh_token: text("refresh_token"),
        refresh_token_expires_in: integer("refresh_token_expires_in"),
        scope: varchar("scope", { length: 191 }),
        token_type: varchar("token_type", { length: 191 }),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
    },
    (account) => ({
        providerProviderAccountIdIndex: uniqueIndex(
            "accounts__provider__providerAccountId__idx"
        ).on(account.provider, account.providerAccountId),
        userIdIndex: index("accounts__userId__idx").on(account.userId),
    })
);

export const sessions = pgTable(
    "sessions",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
        userId: varchar("userId", { length: 191 }).notNull(),
        expires: timestamp("expires").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
    },
    (session) => ({
        sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
            session.sessionToken
        ),
        userIdIndex: index("sessions__userId__idx").on(session.userId),
    })
);

export const verificationTokens = pgTable(
    "verification_tokens",
    {
        identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
        token: varchar("token", { length: 191 }).notNull(),
        expires: timestamp("expires").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
    },
    (verificationToken) => ({
        tokenIndex: uniqueIndex("verification_tokens__token__idx").on(
            verificationToken.token
        ),
    })
);