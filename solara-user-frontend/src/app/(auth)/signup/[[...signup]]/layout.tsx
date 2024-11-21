import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Sign Up - Solara",
    description: "Learning survival course application",
    icons: {
        icon: '../../',
    },
};

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default AuthLayout
