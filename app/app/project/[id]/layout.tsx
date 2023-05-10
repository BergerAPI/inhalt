import { TopNav } from "@/components/nav"

export default async function ProjectLayout({ children, params: { id } }: { children: React.ReactNode, params: { id: string } }) {
    const items = [
        { title: "Overview", href: `/app/project/${id}` },
        { title: "Models", href: `/app/project/${id}/models` },
        { title: "Settings", href: `/app/project/${id}/settings` }
    ]

    return (
        <>
            <header className="sticky top-0 border-b bg-background">
                <div className="container flex items-center py-2">
                    <TopNav items={items} />
                </div>
            </header>

            <div className="container mt-6">
                {children}
            </div>
        </>
    )
}