"use client";

import { cn } from '@/utils/cn/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ComponentProps } from 'react';

interface NavLinkProps extends ComponentProps<typeof Link> {
    isMultiPath?: boolean; // Kiểm tra nhiều đường dẫn
}

const HeaderButton = ({ className, isMultiPath = false, ...props }: NavLinkProps) => {
    const path = usePathname();
    const segments = props.href.toString().split('/');
    const isActive = isMultiPath
        ? path.includes(segments[1])
        : path === props.href;

    return (
        <Link
            {...props}
            className={cn(
                "transition-colors",
                "text-black",
                isActive ? "bg-yellow-300" : "hover:text-black hover:bg-yellow-300",
                className
            )}
        >
            {props.children}
        </Link>
    );
};

export default HeaderButton;
