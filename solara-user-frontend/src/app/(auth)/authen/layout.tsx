import { auth, clerkClient } from '@clerk/nextjs/server';

const AuthenLayout = async ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    const client = await clerkClient()
    const { userId } = await auth();

    if (userId) {
        const user = await client.users.getUser(userId);
        if (user) {
            if (!user.publicMetadata.role)
                await client.users.updateUserMetadata(userId!, {
                    publicMetadata: {
                        "role": "User",
                    },
                })
        }
    }

    return (
        <>
            {children}
        </>
    )
}

export default AuthenLayout
