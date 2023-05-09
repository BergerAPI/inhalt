import { getUser } from "@/lib/auth/options";
import { database } from "@/lib/database";
import { projects } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { FC } from "react";

interface Props {
    params: {
        id: string
    }
}

const Project = async ({ params: { id } }: Props) => {
    const user = await getUser()

    if (user === null)
        return redirect("/auth/signin")

    const project = (await database
        .select()
        .from(projects)
        .where(eq(projects.id, id)))[0]

    if (project === undefined)
        return redirect("/app")

    return <>
        {project.name}
    </>
}

export default Project;