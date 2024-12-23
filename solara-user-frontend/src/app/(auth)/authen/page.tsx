"use client"

import Spinner from '@/components/UI/Spinner';
import { HOME_ROUTE, SIGNIN_ROUTE } from '@/constants/routes';
import useUserStore from '@/zustand/useUserStore';
import { useAuth } from '@clerk/nextjs'
import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {

    const { isSignedIn, getToken } = useAuth();
    const { authenticated, setAuthenticated } = useUserStore();
    const router = useRouter();

    const { loading } = useRequest(async () => {
        if (isSignedIn) {
            if (!authenticated) {
                const token = await getToken({ template: "Solara" })
                await setAuthenticated(token!);
            }
            router.push(HOME_ROUTE)
        } else {
            router.push(SIGNIN_ROUTE)
        }

    }, {
        refreshDeps: [isSignedIn]
    })


    return (
        <div className='flex items-center justify-center'>
            {
                loading ? <Spinner /> : <></>
            }
        </div>
    )
}

export default Page
