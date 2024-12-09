"use client"

import SubTopicRoadMap from '@/components/SubTopicPage/SubTopicRoadMap';
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
    searchProp: '',
    searchKey: '',
    page: 1,
    size: 100,
    orderOn: '',
    isAscending: true,
  });

  const { loading } = useRequest(async () => {
    await getSubTopics(topicId!, query);
  }, {
    refreshDeps: [topicId, query]
  })

  return (
    <div className='flex gap-4 h-screen'>
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
              <>
                <div className="w-8/12 rounded-xl overflow-auto max-h-screen scroll-smooth">

                  <SubTopicRoadMap />

                </div>
                <div className='flex flex-col border-dashed border-red-50 w-4/12 rounded-xl'>
                  content
                </div>
              </>
            )
      }

    </div>
  )
}

export default Page
