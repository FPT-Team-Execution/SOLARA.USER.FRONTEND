"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId');

  return (
    <div>
      This is sub page {topicId}
    </div>
  )
}

export default Page
