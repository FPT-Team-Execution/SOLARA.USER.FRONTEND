"use client"

import Spinner from '@/components/UI/Spinner';
import { HOME_ROUTE, SIGNIN_ROUTE } from '@/constants/routes';
import axiosClient from '@/utils/axios/axiosClient';
import { useAuth } from '@clerk/nextjs'
import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {

    const { isSignedIn, getToken } = useAuth();
    const router = useRouter();

    const { loading } = useRequest(async () => {
        if (isSignedIn) {
            const token: string | null = await getToken({ template: 'Solara' });
            axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
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
