import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface IProps {
    levelIcon: StaticImageData
    levelTitle: string,
    levelValue?: number | string
}

const UserLevelCard = ({ levelIcon, levelTitle, levelValue }: IProps) => {
    return (
        <div className='flex items-center justify-center px-2 gap-2'>
            <div className='text-black'>
                {levelValue}
            </div>
            <div className='w-6'>
                <Image src={levelIcon} alt={levelTitle} />
            </div>

        </div>
    )
}

export default UserLevelCard
