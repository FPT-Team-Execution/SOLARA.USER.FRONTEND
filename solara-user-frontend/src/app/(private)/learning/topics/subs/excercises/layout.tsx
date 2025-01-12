import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Learning - Solara",
    description: "Learning survival course application",
    icons: {
        icon: '../../../',
    },
};

const layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <>
            {children}
        </>
    )
}

export default layout
