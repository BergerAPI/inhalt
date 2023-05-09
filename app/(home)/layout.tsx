import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="border-b">
                <div className="flex justify-between items-center py-2 lg:max-w-5xl lg:m-auto lg:px-0 px-2">
                    <div>
                        <h1 className="font-bold text-xl">Inhalt</h1>
                    </div>

                    <div className="space-x-2">
                        <Link href="/auth/signin">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link href="/auth/signin">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {children}
        </>
    )
}