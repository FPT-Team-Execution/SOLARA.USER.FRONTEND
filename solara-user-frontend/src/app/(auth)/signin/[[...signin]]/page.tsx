import { AUTHEN_ROUTE } from '@/constants/routes';
import { SignIn } from '@clerk/nextjs';

const Page = () => {

    return (
        <div className='my-12'>
            <SignIn fallbackRedirectUrl={AUTHEN_ROUTE} />
        </div>
    )
}

export default Page;
