"use client"

import Spinner from '@/components/UI/Spinner'
import { GetPagedTopicsRequest } from '@/types/topic'
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
    size: 10,
    orderOn: '',
    isAscending: true,
  });

  const { topics, getTopics } = useTopicStore();

  const { loading } = useRequest(async () => {
    await getTopics(query);
  },
    {
      refreshDeps: [query]
    }
  )

  return (
    <div>
      {
        loading ?
          (
            <div className='h-screen w-full flex justify-center items-center'>
              <Spinner />
            </div>
          )
          :
          (
            <div>
              Đây là trang chủ đề
            </div>
          )
      }
    </div>
  );
}

export default Page;
