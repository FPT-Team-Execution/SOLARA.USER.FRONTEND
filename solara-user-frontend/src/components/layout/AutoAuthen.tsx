"use client"

import useUserStore from '@/zustand/useUserStore';
import { useAuth } from '@clerk/nextjs';
import { useRequest } from 'ahooks';

const AutoAuthen = () => {
    const { isSignedIn, getToken } = useAuth();
    const { authenticated, setAuthenticated } = useUserStore();

    const { } = useRequest(async () => {
        if (isSignedIn) {
            if (!authenticated) {
                const token = await getToken({ template: "Solara" })
                await setAuthenticated(token!);
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
