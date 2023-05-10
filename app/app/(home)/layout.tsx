export default async function AppHomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mt-6">
            {children}
        </div>
    )
}