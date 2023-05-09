import { CreateProject } from "@/components/create-project"
import ProjectCard from "@/components/project-card"
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
        <div className="w-full space-y-2">
            <div className="grid gap-3 grid-cols-[1fr_200px]">
                <Input placeholder="Enter your search term" />
                <CreateProject />
            </div>

            <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
                {projects.map(it => <Link href={`/app/project/${it.id}`} key={it.id}>
                    <ProjectCard title={it.name} plan="free" createdAt={it.created_at} />
                </Link>)}
            </div>
        </div>
    )
}

export default Dashboard