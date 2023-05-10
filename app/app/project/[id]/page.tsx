import { getUser } from "@/lib/auth/options";
import { getProject } from "@/lib/projects";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string
    }
}

const Project = async ({ params: { id } }: Props) => {
    const user = await getUser()

    if (user === null)
        return redirect("/auth/signin")

    const project = await getProject(id, user.id)

    if (project === null)
        return redirect("/app")

    return <>
        {project.name}
    </>
}

export default Project;