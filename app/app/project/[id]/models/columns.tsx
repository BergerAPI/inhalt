"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { models } from "@/lib/database/schema"
import { ColumnDef, Row } from "@tanstack/react-table"
import { InferModel } from "drizzle-orm"
import { Loader2, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useState } from "react"

interface Props extends PropsWithChildren {
    row: Row<InferModel<typeof models>>
}

const DeleteMenu = ({ children, row }: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const onDelete = async () => {
        setLoading(true)

        const response = await fetch(`/api/project/${row.original.project_id}/models/${row.original.id}`, {
            method: "DELETE",
        })

        setLoading(false)

        if (!response?.ok) {
            return router.push("/")
        }

        router.refresh()
        router.push(`/app/project/${row.original.project_id}/models/`)
    }

    return (
        <AlertDialog>
            {children}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        model and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <></>
                        )}

                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export const columns: ColumnDef<InferModel<typeof models>>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DeleteMenu row={row}>

                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(row.original.id)}
                            >
                                Copy model ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View model</DropdownMenuItem>
                            <AlertDialogTrigger asChild>

                                <DropdownMenuItem>Delete model</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DeleteMenu >
                </DropdownMenu>
            )
        },
    },
]