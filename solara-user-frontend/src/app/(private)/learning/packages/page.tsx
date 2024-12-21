"use client"

import Spinner from '@/components/UI/Spinner'
import { useRequest } from 'ahooks'
import React from 'react'

const Page = () => {

  const { loading } = useRequest(async () => {

  })

  return (
    <div className='flex gap-4 h-full'>
      {
        loading
          ?
          (
            <div className='h-full w-full flex justify-center items-center'>
              <Spinner />
            </div>
          )
          :
          <>
            
          </>
      }

    </div>
  )
}

export default Page
