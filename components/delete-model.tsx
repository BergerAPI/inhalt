import { Loader2, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Row } from "@tanstack/react-table"
import { InferModel } from "drizzle-orm"
import { models } from "@/lib/database/schema"

interface Props extends PropsWithChildren {
    row: Row<InferModel<typeof models>>
}

export const DeleteModel = ({ children, row }: Props) => {
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