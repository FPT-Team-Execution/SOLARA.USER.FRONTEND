import React from 'react'

const page = () => {
    return (
        <div className="h-full">
            <div className='h-1/12 bg-slate-400'></div>
            <div className='h-8/12 flex bg-green-200'>
                <div className='w-4/6 bg-yellow-200'></div>
                <div className='w-2/6 bg-yellow-00'></div>
            </div>
            <div className='h-3/12 bg-yellow-50'></div>
        </div>
    )
}

export default page

