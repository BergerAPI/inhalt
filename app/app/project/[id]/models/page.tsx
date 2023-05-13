import { getUser } from "@/lib/auth/options";
import { getProject, getProjectModels } from "@/lib/projects";
import { redirect } from "next/navigation";
import { CreateModel } from "./create-model";
import { DataTable } from "./data-table";
import { columns } from "./columns"

interface Props {
    params: {
        id: string
    }
}

const ProjectModels = async ({ params: { id } }: Props) => {
    const user = await getUser()

    if (user === null)
        return redirect("/auth/signin")

    const project = await getProject(id, user.id)

    if (project === null)
        return redirect("/app")

    const models = await getProjectModels(project.id)

    return <div className="space-y-2">
        <CreateModel projectId={project.id} />
        <DataTable columns={columns} data={models} />
    </div>
}

export default ProjectModels;