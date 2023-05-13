import { getUser } from "@/lib/auth/options"
import { database } from "@/lib/database"
import { models } from "@/lib/database/schema"
import { getModel, getProject } from "@/lib/projects"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params: { modelId, id } }: { params: { modelId: string, id: string } }) {
    const user = await getUser()

    if (user === null)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const project = await getProject(id)

    if (project === null)
        return NextResponse.json({ error: "Not Found" }, { status: 404 })

    const model = await getModel(modelId, project.id)

    if (model === null)
        return NextResponse.json({ error: "Not Found" }, { status: 404 })

    await database
        .delete(models)
        .where(eq(models.id, model.id))
        .returning()

    return NextResponse.json({ success: true })
}