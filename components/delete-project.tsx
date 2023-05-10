"use client"

import { projects } from "@/lib/database/schema";
import { InferModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export const DeleteProject = ({ project }: { project: InferModel<typeof projects> }) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const onDelete = async () => {
        setLoading(true)

        const response = await fetch(`/api/project/${project.id}`, {
            method: "DELETE",
        })

        setLoading(false)

        if (!response?.ok)
            return router.push("/")

        router.refresh()
        router.push("/app")
    }

    return (
        <Button variant="destructive" onClick={onDelete}>Delete Project</Button>
    )
}
