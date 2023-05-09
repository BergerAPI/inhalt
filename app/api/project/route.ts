import { getUser } from "@/lib/auth/options"
import { database } from "@/lib/database"
import { projects } from "@/lib/database/schema"
import cuid from "@paralleldrive/cuid2"
import { NextResponse } from "next/server"
import z from "zod"

const postSchema = z.object({
    name: z.string(),
    plan: z.enum(["free", "pro"])
})

export async function POST(request: Request) {
    const json = await request.json()
    const validated = postSchema.safeParse(json)

    if (!validated.success)
        return NextResponse.json({ error: validated.error }, { status: 400 })

    const user = await getUser()

    if (user === null)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const rows = await database
        .insert(projects)
        .values({
            id: cuid.createId(),
            name: validated.data.name,
            owner_id: user.id
        }).returning()

    return NextResponse.json(rows[0])
}