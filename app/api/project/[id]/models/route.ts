import { getUser } from "@/lib/auth/options"
import { database } from "@/lib/database"
import { modelKeys, models, projects } from "@/lib/database/schema"
import { getProject } from "@/lib/projects"
import cuid from "@paralleldrive/cuid2"
import { NextResponse } from "next/server"
import z from "zod"

const postSchema = z.object({
    name: z.string().min(3),
})

export async function POST(request: Request, { params: { id } }: { params: { id: string } }) {
    const json = await request.json()
    const validated = postSchema.safeParse(json)

    if (!validated.success)
        return NextResponse.json({ error: validated.error }, { status: 400 })

    const user = await getUser()

    if (user === null)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const project = await getProject(id)

    if (project === null)
        return NextResponse.json({ error: "Not Found" }, { status: 404 })

    await database
        .insert(models)
        .values({
            id: cuid.createId(),
            name: validated.data.name,
            project_id: project.id
        })
        .returning()

    return NextResponse.json({ success: true })
}