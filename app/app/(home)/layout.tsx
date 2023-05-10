import { UserAvatar } from "@/components/user-avatar";
import { getUser } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function AppHomeLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser()

    if (user === null)
        return redirect("/auth/signin")

    return (
        <div>
            <header className="sticky top-0 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <div>
                        Inhalt
                    </div>

                    <UserAvatar user={user} />
                </div>
            </header>

            <div className="container mt-6">
                {children}
            </div>
        </div>
    )
}