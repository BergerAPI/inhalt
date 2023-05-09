import CreateProject from "@/components/create-project"
import { getServerSideSession } from "@/lib/auth/options"
import { database } from "@/lib/database"
import { projects as projectsTable } from "@/lib/database/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { redirect } from "next/navigation"

const Dashboard = async () => {
    const session = await getServerSideSession()

    if (session === null || session.user === undefined)
        return redirect("/auth/signin")

    const projects = await database
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.owner_id, session.user.id))

    return (
        <main>
            <h1>{session.user.name}</h1>

            <CreateProject />

            {projects.map(it => <Link href={`/app/project/${it.id}`}>{it.name}</Link>)}
        </main>
    )
}

export default Dashboard