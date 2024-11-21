import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Learning - Solara",
    description: "Learning survival course application",
    icons: {
        icon: '../../',
    },
};

const LearningLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default LearningLayout