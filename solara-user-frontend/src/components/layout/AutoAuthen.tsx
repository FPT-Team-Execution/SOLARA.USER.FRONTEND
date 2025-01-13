"use client"

import useUserStore from '@/zustand/useUserStore';
import { useAuth, useSession } from '@clerk/nextjs';
import { useRequest } from 'ahooks';

const AutoAuthen = () => {
    const { isSignedIn } = useAuth();
    const { setAuthenticated, getUserLevel } = useUserStore();
    const { session } = useSession();
    const { } = useRequest(async () => {
        if (isSignedIn) {
            await session?.touch();
            await setAuthenticated();
            await getUserLevel();
        }
    }, {
        refreshDeps: [isSignedIn]
    })
    return (
        <>
        </>
    )
}

export default AutoAuthen
