"use client"

import TopicCard from '@/components/TopicPage/TopicCard'
import TopicQuery from '@/components/TopicPage/TopicQuery'
import Spinner from '@/components/UI/Spinner'
import { GetPagedTopicsRequest } from '@/types/topic'
import useTopicStore from '@/zustand/useTopicStore'
import { useRequest } from 'ahooks'
import { useState } from 'react'

const Page = () => {

  const [query, setQuery] = useState<GetPagedTopicsRequest>({
    searchProp: 'topicName',
    searchKey: '',
    page: 1,
    size: 10,
    orderOn: 'topicName',
    isAscending: true,
  });

  const updateQuery = (key: keyof GetPagedTopicsRequest, value: string | number | boolean) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [key]: value,
    }));
  };

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
        loading
          ?
          (
            <div className='h-screen w-full flex justify-center items-center'>
              <Spinner />
            </div>
          )
          :
          topics === null
            ?
            (
              <span>There is no topic</span>
            )
            :
            (
              <div>

                <div>
                  <div>
                    <h1 className='text-sm font-semibold p-4 text-left'>Gần đây</h1>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <h1 className='text-sm font-semibold p-4 text-left'>Các chủ đề phổ biến</h1>
                  </div>

                  <div className='flex justify-center items-center'>
                    <TopicQuery query={query} updateQuery={updateQuery} />
                  </div>

                  <div className='flex gap-4 flex-wrap justify-center items-center'>
                    {topics?.items.map((item, index) => {
                      return (
                        <TopicCard topic={item} key={index} />
                      );
                    })}
                  </div>
                </div>

              </div>
            )
      }
    </div>
  );
}

export default Page;
