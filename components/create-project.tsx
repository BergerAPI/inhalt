"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Plus } from "lucide-react"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface Inputs {
    name: string
    plan: "free"
}

const CreateProject = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<Inputs>();
    const [isLoading, setLoading] = useState<boolean>(false)

    const onCreate: SubmitHandler<Inputs> = async ({ name, plan }) => {
        setLoading(true)

        const response = await fetch("/api/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, plan })
        })

        setLoading(false)
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Create Project</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onCreate)}>
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Create a new project. Click Create when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2 pb-4">
                    {(errors.plan || errors.name) && <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Please make sure you selected a plan and the name is longer than 3 chars.
                        </AlertDescription>
                    </Alert>}

                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input id="name" {...register("name", { minLength: 3 })} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="plan">
                            Subscription plan
                        </Label>

                        <Controller
                            name="plan"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="free">
                                            <span className="font-medium">Free</span> -{" "}
                                            <span className="text-muted-foreground">
                                                Enjoy our generous free tier
                                            </span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <></>
                        )}

                        Create Project
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
}

export default CreateProject