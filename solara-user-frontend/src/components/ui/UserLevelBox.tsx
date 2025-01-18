import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface IProps {
    levelIcon: StaticImageData
    levelTitle: string,
    levelValue?: number | string
}

const UserLevelBox = ({ levelIcon, levelTitle, levelValue }: IProps) => {
    return (
        <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg shadow-sm">
            <div className='w-6'>
                <Image src={levelIcon} alt={levelTitle} />
            </div>
            <div>
                <p className="text-gray-800 font-bold text-lg">{levelValue}</p>
                <p className="text-gray-500 text-sm">{levelTitle}</p>
            </div>
        </div>
    )
}

export default UserLevelBox
