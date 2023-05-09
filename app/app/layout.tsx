import { UserAvatar } from "@/components/user-avatar";
import { getUser } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser()

    if (user === null)
        return redirect("/auth/signin")

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <div>
                        Inhalt
                    </div>

                    <UserAvatar user={user} />
                </div>
            </header>

            <div className="container">
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}