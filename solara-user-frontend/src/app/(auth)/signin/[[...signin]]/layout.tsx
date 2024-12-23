import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign In - Solara",
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
