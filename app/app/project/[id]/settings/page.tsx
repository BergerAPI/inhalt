import { DeleteProject } from "@/components/delete-project";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth/options";
import { database } from "@/lib/database";
import { projects } from "@/lib/database/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string
    }
}

const ProjectSettings = async ({ params: { id } }: Props) => {
    const user = await getUser()

    if (user === null)
        return redirect("/auth/signin")

    const rows = await database
        .select()
        .from(projects)
        .where(and(
            eq(projects.id, id),
            eq(projects.owner_id, user.id)
        ))

    if (rows.length < 1)
        return redirect("/app")

    const project = rows[0]

    return <>
        <DeleteProject project={project} />
    </>
}

export default ProjectSettings;