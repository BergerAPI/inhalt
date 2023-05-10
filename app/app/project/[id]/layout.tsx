import { TopNav } from "@/components/nav"
import { UserAvatar } from "@/components/user-avatar"
import { getUser } from "@/lib/auth/options"
import { redirect } from "next/navigation"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default async function ProjectLayout({ children, params: { id } }: { children: React.ReactNode, params: { id: string } }) {
    const items = [
        { title: "Overview", href: `/app/project/${id}` },
        { title: "Models", href: `/app/project/${id}/models` },
        { title: "Settings", href: `/app/project/${id}/settings` }
    ]

    const user = await getUser()

    if (user === null)
        return redirect("/auth/signin")

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <Link href="/app">
                        <Logo />
                    </Link>

                    <UserAvatar user={user} />
                </div>
            </header>

            <header className="sticky top-0 border-b bg-background">
                <div className="container flex items-center py-2">
                    <TopNav items={items} />
                </div>
            </header>

            <div className="container mt-6">
                {children}
            </div>
        </div>
    )
}