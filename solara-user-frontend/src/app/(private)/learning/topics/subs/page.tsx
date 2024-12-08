"use client"

import Spinner from '@/components/UI/Spinner';
import { GetPagedSubTopicRequest } from '@/types/subTopic';
import useSubTopicStore from '@/zustand/useSubTopicStore';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId');
  const { subTopics, getSubTopics } = useSubTopicStore();

  const [query, setQuery] = useState<GetPagedSubTopicRequest>({
    searchProp: 'subTopicName',
    searchKey: '',
    page: 1,
    size: 10,
    orderOn: '',
    isAscending: true,
  });


  const { loading } = useRequest(async () => {
    await getSubTopics(topicId!, query);
  }, {
    refreshDeps: [topicId]
  })

  return (
    <div className='flex gap-4'>
      {
        loading
          ?
          (
            <div className='h-screen w-full flex justify-center items-center'>
              <Spinner />
            </div>
          )
          :
          subTopics === null
            ?
            (
              <span>There is no sub topic</span>
            )
            :
            (
              <div className='bg-yellow-500 w-8/12 rounded-xl'>

                d

              </div>
            )
      }
      <div className='bg-red-500 flex flex-col border-dashed border-red-50 w-4/12 rounded-xl'>
        d
      </div>
    </div>
  )
}

export default Page
