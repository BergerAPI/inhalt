import { getUser } from "@/lib/auth/options"
import { database } from "@/lib/database"
import { projects } from "@/lib/database/schema"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

export async function DELETE(request: Request, { params: { id } }: { params: { id: string } }) {
    const user = await getUser()

    if (user === null)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const rows = await database.select().from(projects).where(eq(projects.id, id))

    if (rows.length < 1)
        return NextResponse.json({ error: "Not Found" }, { status: 404 })

    // Deleting the project
    await database.delete(projects).where(eq(projects.id, id))

    return NextResponse.json({ success: true })
}