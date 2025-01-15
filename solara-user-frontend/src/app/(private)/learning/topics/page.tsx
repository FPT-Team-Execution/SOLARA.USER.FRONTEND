"use client"

import TopicCard from '@/components/TopicPage/TopicCard'
import TopicQuery from '@/components/TopicPage/TopicQuery'
import Spinner from '@/components/ui/Spinner'
import { LEARNING_TOPICS_SUBS_ROUTE } from '@/constants/routes'
import { GetPagedTopicsRequest } from '@/types/topic'
import useTopicStore from '@/zustand/useTopicStore'
import { useRequest } from 'ahooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Page = () => {

  const { topics, getTopics } = useTopicStore();
  const router = useRouter();

  const [query, setQuery] = useState<GetPagedTopicsRequest>({
    searchProp: 'topicName',
    searchKey: '',
    page: 1,
    size: 10,
    orderOn: '',
    isAscending: true,
  });

  const updateQuery = (key: keyof GetPagedTopicsRequest, value: string | number | boolean) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [key]: value,
    }));
  };

  const handleNavigate = (id: string): void => {
    router.push(`${LEARNING_TOPICS_SUBS_ROUTE}?topicId=${id}`)
  }


  const { loading } = useRequest(async () => {
    await getTopics(query);
  },
    {
      refreshDeps: [query]
    }
  )

  return (
    <div>

      <div>

        <div className='flex'>
          <div className='w-1/2'>
            <div>
              <h1 className='text-sm font-semibold p-4 text-left'>Đang học</h1>
            </div>
            <div>
              s
            </div>
          </div>
          <div className='w-1/2'>
            <div>
              <h1 className='text-sm font-semibold p-4 text-left'>Hoàn thành</h1>
            </div>
            <div>
              s
            </div>
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
            {
              loading ?
                <div className='mt-8'>
                  <Spinner />
                </div>
                :
                topics ?
                  topics?.items.map((item, index) => {
                    return (
                      <div className='cursor-pointer w-full sm:w-1/2 md:w-1/3 max-w-[300px]' key={index} onClick={() => handleNavigate(item.topicId)}>
                        <TopicCard topic={item} />
                      </div>
                    );
                  })
                  :
                  <span>There is no topic</span>
            }
          </div>
        </div>

      </div>

    </div>
  );
}

export default Page;
