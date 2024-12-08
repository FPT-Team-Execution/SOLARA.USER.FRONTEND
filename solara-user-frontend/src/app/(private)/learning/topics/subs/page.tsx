"use client"

import { GetPagedSubTopicRequest } from '@/types/subTopic';
import useSubTopicStore from '@/zustand/useSubTopicStore';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId');

  const [query, setQuery] = useState<GetPagedSubTopicRequest>({
    searchProp: 'subTopicName',
    searchKey: '',
    page: 1,
    size: 10,
    orderOn: '',
    isAscending: true,
  });

  const { subTopics, getSubTopics } = useSubTopicStore();

  const { loading } = useRequest(async () => {
    await getSubTopics(topicId!, query);
  }, {
    refreshDeps: [topicId]
  })

  return (
    <div className='text-sm'>
      This is sub page {topicId}
    </div>
  )
}

export default Page
