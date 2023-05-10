"use client"

import { BoxSelect } from "lucide-react"

export const Logo = () => {
    return (
        <div className="flex gap-2 items-center">
            <BoxSelect className="w-4 h-4" />
            <p className="text-base font-bold tracking-tight">Inhalt</p>
        </div>
    )
}
