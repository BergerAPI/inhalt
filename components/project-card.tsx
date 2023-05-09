import { FileBox, Paperclip } from "lucide-react"
import { FC } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface Props {
    title: string
    plan: "free" | "pro"
    createdAt: Date
}

const getRelativeTime = (timestamp: number) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto', });
    const daysDifference = Math.round(
        (timestamp - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );

    return rtf.format(daysDifference, 'days');
}

const ProjectCard: FC<Props> = ({ title, createdAt }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="flex gap-2 items-center">
                    <FileBox className="w-4 h-4" />
                    3 Models
                </div>

                <div className="flex gap-2 items-center">
                    <Paperclip className="w-4 h-4" />
                    14 Entries
                </div>
            </CardContent>

            <CardFooter>
                <p className="text-sm text-muted-foreground">Created {getRelativeTime(createdAt.getTime())}</p>
            </CardFooter>
        </Card>
    )
}

export default ProjectCard