import { AUTHEN_ROUTE } from '@/constants/routes'
import { SignUp } from '@clerk/nextjs'

const Page = () => {

    return (
        <div className='my-12'>
            <SignUp fallbackRedirectUrl={AUTHEN_ROUTE} />
        </div>
    )
}

export default Page
