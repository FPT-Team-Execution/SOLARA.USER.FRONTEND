import LearningSpace from '@/components/Layout/LearningSpace';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Learning - Solara",
    description: "Learning survival course application",
    icons: {
        icon: '../../',
    },
};

const LearningLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <LearningSpace>
            {children}
        </LearningSpace>
    )
}

export default LearningLayout
