"use client"

import useUserStore from '@/zustand/useUserStore';
import { useAuth } from '@clerk/nextjs';
import { useRequest } from 'ahooks';

const AutoAuthen = () => {
    const { isSignedIn, getToken } = useAuth();
    const { authenticated, setAuthenticated, getUserLevel } = useUserStore();

    const { } = useRequest(async () => {
        if (isSignedIn) {
            if (!authenticated) {
                const token = await getToken({ template: "Solara" })
                await setAuthenticated(token!);
                await getUserLevel();
            }
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
