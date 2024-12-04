"use client";

import { cn } from '@/utils/cn/cn'; // Hàm kết hợp các class CSS
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ComponentProps } from 'react';

interface SidebarButtonProps extends ComponentProps<typeof Link> {
    children: React.ReactNode; // Văn bản hoặc phần tử con
    icon?: React.ReactNode; // Icon tùy chọn
    isMultiPath?: boolean; // Kiểm tra nhiều đường dẫn
    pathIndex: number;
}

const SidebarButton = ({ className, pathIndex = 1, isMultiPath = false, children, icon, ...props }: SidebarButtonProps) => {
    const path = usePathname();
    const segments = props.href.toString().split('/');
    const isActive = isMultiPath
        ? path.includes(segments[pathIndex])
        : path === props.href;

    return (
        <Link
            {...props}
        >
            <div className={cn(
                "transition-colors",
                "text-black",
                "flex items-center justify-center m-2 rounded-2xl gap-2",
                isActive ? "bg-yellow-300" : "hover:text-black hover:bg-yellow-300",
                className
            )}>
                {icon && <span>{icon}</span>}
                {children}
            </div>
        </Link>
    );
};

export default SidebarButton;
