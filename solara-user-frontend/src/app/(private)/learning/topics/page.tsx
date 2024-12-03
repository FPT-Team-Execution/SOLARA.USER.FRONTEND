"use client"

import { GetPagedTopicsRequest } from '@/types/topic'
import axiosClient from '@/utils/axios/axiosClient'
import useTopicStore from '@/zustand/useTopicStore'
import { useRequest } from 'ahooks'
import { useState } from 'react'

const Page = () => {
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
    console.log(axiosClient.defaults.headers.common.Authorization);
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
