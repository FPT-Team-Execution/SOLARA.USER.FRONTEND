"use client"

import TopicCard from '@/components/TopicPage/TopicCard'
import TopicCardLite from '@/components/TopicPage/TopicCardLite'
import TopicQuery from '@/components/TopicPage/TopicQuery'
import LoadingBar from '@/components/ui/LoadingBar'
import Spinner from '@/components/ui/Spinner'
import { GET_USER_TOPIC_API } from '@/constants/apis'
import { LEARNING_TOPICS_SUBS_ROUTE } from '@/constants/routes'
import { TopicOfUserStatusEnum } from '@/enums/userTopicStatus'
import { IBaseModel } from '@/interfaces/general'
import { GetPagedTopicsRequest, TopicOfUserDto } from '@/types/topic'
import axiosClient from '@/utils/axios/axiosClient'
import useTopicStore from '@/zustand/useTopicStore'
import { useRequest } from 'ahooks'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Page = () => {

  const [completedTopics, setCompletedTopics] = useState<TopicOfUserDto[]>();
  const [inProgressTopics, setInProgressTopics] = useState<TopicOfUserDto[]>();
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

  const { loading: getCompletedLoading } = useRequest(async () => {
    const response = await axiosClient.get<IBaseModel<TopicOfUserDto[]>>(GET_USER_TOPIC_API(getCookie("__appUserId") as string),
      {
        params: { status: TopicOfUserStatusEnum.Completed }
      })

    if (!response.data.isSuccess) {
      return
    }

    setCompletedTopics(response.data.responseRequest)
  })

  const { loading: getInProgressLoading } = useRequest(async () => {
    const response = await axiosClient.get<IBaseModel<TopicOfUserDto[]>>(GET_USER_TOPIC_API(getCookie("__appUserId") as string),
      {
        params: { status: TopicOfUserStatusEnum.InProgress }
      })

    if (!response.data.isSuccess) {
      return
    }

    setInProgressTopics(response.data.responseRequest)
  })

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

        <div className='flex p-4 gap-4'>
          <div className='w-1/2 space-y-4'>
            <div>
              <h1 className='text-sm font-semibold text-left'>Đang học</h1>
            </div>
            <div>
              {
                getInProgressLoading
                  ?
                  <div className='flex justify-center items-center'>
                    <LoadingBar />
                  </div>
                  :
                  inProgressTopics && inProgressTopics.length > 0 ?
                    <div className='flex items-start flex-wrap gap-4'>
                      {
                        inProgressTopics.map((item, index) => {
                          return (
                            <TopicCardLite status={TopicOfUserStatusEnum.InProgress} key={index} userTopic={item} />
                          )
                        })
                      }
                    </div>
                    :
                    <span>Bạn vẫn chưa học bài học nào!</span>
              }
            </div>
          </div>
          <div className='w-1/2 space-y-4'>
            <div>
              <h1 className='text-sm font-semibold text-left'>Hoàng thành</h1>
            </div>
            <div>
              {
                getCompletedLoading
                  ?
                  <div className='flex justify-center items-center'>
                    <LoadingBar />
                  </div>
                  :
                  completedTopics && completedTopics.length > 0 ?
                    <div className='flex items-start flex-wrap gap-4'>
                      {
                        completedTopics.map((item, index) => {
                          return (
                            <TopicCardLite status={TopicOfUserStatusEnum.Completed} key={index} userTopic={item} />
                          )
                        })
                      }
                    </div>
                    :
                    <span>Bạn vẫn chưa hoàn thành bài học nào!</span>
              }
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
