"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import * as icons from 'lucide-react';
import { LucideIcon } from "lucide-react";

interface SidebarNavProps {
    items: {
        title: string
        href: string
        icon: keyof typeof icons
        disabled: boolean
    }[]
}

export function SidebarNav({ items }: SidebarNavProps) {
    const path = usePathname()

    if (!items?.length) {
        return null
    }

    return (
        <nav className="grid items-start gap-2">
            {items.map((item, index) => {
                const Icon: LucideIcon = icons[item.icon || "ArrowBigLeft"] as LucideIcon

                return (
                    item.href && (
                        <Link key={index} href={item.disabled ? "/" : item.href}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    path === item.href ? "bg-accent" : "transparent",
                                    item.disabled && "cursor-not-allowed opacity-80"
                                )}
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                <span>{item.title}</span>
                            </span>
                        </Link>
                    )
                )
            })}
        </nav>
    )
}

interface TopNavProps {
    items: {
        title: string
        href: string
    }[]
}

export function TopNav({ items }: TopNavProps) {
    const path = usePathname()

    if (!items?.length) {
        return null
    }

    return (
        <>
            {items.map((item, index) => {
                return (
                    item.href && (
                        <Link key={index} href={item.href}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    path === item.href ? "bg-accent" : "transparent",
                                )}
                            >
                                <span>{item.title}</span>
                            </span>
                        </Link>
                    )
                )
            })}
        </>
    )
}