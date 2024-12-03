"use client"

import { GetPagedTopicsRequest } from '@/types/topic'
import axiosClient from '@/utils/axios/axiosClient'
import useTopicStore from '@/zustand/useTopicStore'
import { useAuth } from '@clerk/nextjs'
import { useRequest } from 'ahooks'
import { useState } from 'react'

const Page = () => {
  const { getToken } = useAuth();

  const [query, setQuery] = useState<GetPagedTopicsRequest>({
    searchProp: '',
    searchKey: '',
    page: 1,
    size: 1,
    orderOn: '',
    isAscending: true,
  });

  const { topics, getTopics } = useTopicStore();

  const { } = useRequest(async () => {
    await getTopics(query);
  },
    {
      refreshDeps: [query]
    }
  )

  return (
    <div>
      Đây là trang topics
    </div>
  );
}

export default Page;
