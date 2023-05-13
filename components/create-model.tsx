"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface Inputs {
    name: string
}

interface Props {
    projectId: string
}

export const CreateModel = ({ projectId }: Props) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<Inputs>();
    const [isLoading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const onCreate: SubmitHandler<Inputs> = async ({ name }) => {
        setLoading(true)

        const response = await fetch(`/api/project/${projectId}/models`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        })

        setLoading(false)

        if (!response?.ok) {
            return router.push("/")
        }

        const model = await response.json()

        router.refresh()
        router.push(`/app/project/${projectId}/models/${model.id}`)
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Create Model</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onCreate)}>
                <DialogHeader>
                    <DialogTitle>Create Model</DialogTitle>
                    <DialogDescription>
                        Create a new model. Click Create when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2 pb-4">
                    {(errors.name) && <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Please make the name is longer than 3 chars.
                        </AlertDescription>
                    </Alert>}

                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input id="name" {...register("name", { minLength: 3 })} />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit">
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <></>
                        )}

                        Create Model
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
}