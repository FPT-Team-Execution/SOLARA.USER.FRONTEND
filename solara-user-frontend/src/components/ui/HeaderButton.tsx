"use client"

import { cn } from '@/utils/cn/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentProps } from 'react'

const NavLink = ({ className, ...props }: ComponentProps<typeof Link>) => {
    const path = usePathname()
    const isActive = path === props.href

    return (
        <Link
            {...props}
            className={
                cn(
                    "transition-colors",
                    "text-black",
                    isActive ? "bg-yellow-300" : "hover:text-black hover:bg-yellow-300",
                    className
                )}
        >
        </Link>

    )
}

export default NavLink
