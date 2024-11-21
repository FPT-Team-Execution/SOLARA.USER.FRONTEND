import { AUTHEN_ROUTES } from '@/constants/routes';
import { SignIn } from '@clerk/nextjs';
import React from 'react'

const Page = () => {

    return (
        <div className='my-12'>
            <SignIn fallbackRedirectUrl={AUTHEN_ROUTES} />
        </div>
    )
}

export default Page;
