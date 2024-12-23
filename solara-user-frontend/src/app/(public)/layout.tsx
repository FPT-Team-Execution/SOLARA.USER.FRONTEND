import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Market - Solara",
    description: "Learning survival course application",
    icons: {
        icon: '../../',
    },
};

const MarketLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default MarketLayout
