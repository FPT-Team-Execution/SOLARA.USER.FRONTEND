"use client"

import Spinner from '@/components/ui/Spinner';
import { HOME_ROUTE, SIGNIN_ROUTE } from '@/constants/routes';
import useUserStore from '@/zustand/useUserStore';
import { useAuth } from '@clerk/nextjs'
import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';

const Page = () => {

    const { isSignedIn, getToken } = useAuth();
    const { authenticated, setAuthenticated } = useUserStore();
    const router = useRouter();


    router.push(HOME_ROUTE)



    return (
        <div className='flex items-center justify-center'>
        </div>
    )
}

export default Page
