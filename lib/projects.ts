import { and, eq, sql } from "drizzle-orm"
import { database } from "./database"
import { models, projects } from "./database/schema"

/**
 * Getting a project by its id
 */
export const getProject = async (id: string, userId?: string) => {
    const rows = await database
        .select()
        .from(projects)
        .where(and(
            eq(projects.id, id),
            userId === undefined ? sql`true` : eq(projects.owner_id, userId)
        ))

    return rows[0]
}

/**
 * Getting a project by its id
 */
export const getProjectModels = async (id: string) => {
    const rows = await database
        .select()
        .from(models)
        .where(eq(models.project_id, id))

    return rows
}

/**
 * Getting a project by its id
 */
export const getModel = async (id: string, projectId?: string) => {
    const rows = await database
        .select()
        .from(models)
        .where(and(
            eq(models.id, id),
            projectId === undefined ? sql`true` : eq(models.project_id, projectId)
        ))

    return rows[0]
}