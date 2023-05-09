import { CreateProject } from "@/components/create-project"
import ProjectCard from "@/components/project-card"
import { ProjectView } from "@/components/project-view"
import { Input } from "@/components/ui/input"
import { getUser } from "@/lib/auth/options"
import { database } from "@/lib/database"
import { projects as projectsTable } from "@/lib/database/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { redirect } from "next/navigation"

const Dashboard = async () => {
    const user = await getUser()

    if (user === null)
        return redirect("/auth/signin")

    const projects = await database
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.owner_id, user.id))

    return (
        <ProjectView projects={projects} />
    )
}

export default Dashboard