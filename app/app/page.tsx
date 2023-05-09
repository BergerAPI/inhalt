import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

const Dashboard = async () => {
    const session = await getServerSession(authOptions)

    if (session === null)
        return redirect("/auth/signin")

    return (
        <main>
            <h1>{session.user?.name}</h1>
        </main>
    )
}

export default Dashboard