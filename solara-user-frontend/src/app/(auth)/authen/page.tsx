"use client"

import Spinner from '@/components/UI/Spinner';
import { HOME_ROUTE, SIGNIN_ROUTE } from '@/constants/routes';
import useSysAuthStore from '@/zustand/useSysAuthStore';
import { useAuth } from '@clerk/nextjs'
import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {

    const { isSignedIn } = useAuth();
    const { authenticated, setAuthenticated } = useSysAuthStore();
    const router = useRouter();

    const { loading } = useRequest(async () => {
        if (isSignedIn) {
            if (!authenticated) {
                await setAuthenticated();
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
