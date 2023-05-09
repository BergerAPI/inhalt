import { getServerSideSession } from "@/lib/auth/options"
import { redirect } from "next/navigation"

const Dashboard = async () => {
    const session = await getServerSideSession()

    if (session === null)
        return redirect("/auth/signin")

    return (
        <main>
            <h1>{session.user?.name}</h1>
        </main>
    )
}

export default Dashboard