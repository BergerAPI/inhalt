"use client"

import { InferModel } from "drizzle-orm";
import Link from "next/link";
import { Input } from "./ui/input";
import { CreateProject } from "./create-project";
import ProjectCard from "./project-card";
import { projects as databaseProjects } from "@/lib/database/schema"
import { useDebouncedState } from "@mantine/hooks";
import { useMemo } from "react";

export const ProjectView = ({ projects }: { projects: InferModel<typeof databaseProjects>[] }) => {
    const [searchTerm, setSearchTerm] = useDebouncedState('', 200);
    const filteredProjects = useMemo(() => projects.filter(it => it.name.includes(searchTerm.trim())), [searchTerm])

    return (
        <div className="w-full space-y-2">
            <div className="grid gap-3 grid-cols-[1fr_200px]">
                <Input
                    placeholder="Enter your search term"
                    defaultValue={searchTerm}
                    onChange={(event) => setSearchTerm(event.currentTarget.value)} />
                <CreateProject />
            </div>

            {filteredProjects.length > 0 ?
                (
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
                        {filteredProjects.map(it => <Link href={`/app/project/${it.id}`} key={it.id}>
                            <ProjectCard title={it.name} plan="free" createdAt={it.created_at} />
                        </Link>)}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-3 border rounded-md h-[340px]">
                        <h1 className="font-bold">No Results Found</h1>
                        <p>{projects.length > 0 ? `Your search for "${searchTerm}" did not return any results.`
                            : `You don't have any project yet. Go ahead and create one!`}</p>
                    </div>
                )}

        </div>
    )
}
