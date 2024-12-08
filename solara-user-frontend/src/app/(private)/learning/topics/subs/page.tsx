"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId');

  return (
    <div className='text-sm'>
      This is sub page {topicId}
    </div>
  )
}

export default Page