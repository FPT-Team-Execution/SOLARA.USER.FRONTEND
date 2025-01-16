"use client";

import SubTopicDetail from '@/components/SubTopicPage/SubTopicDetail';
import SubTopicRoadMap from '@/components/SubTopicPage/SubTopicRoadMap';
import Spinner from '@/components/ui/Spinner';
import { GetPagedSubTopicRequest } from '@/types/subTopic';
import useSubTopicStore from '@/zustand/useSubTopicStore';
import useTopicStore from '@/zustand/useTopicStore';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId');
  const { subTopics, getSubTopics, getCompletedSubTopics } = useSubTopicStore();
  const { getTopic } = useTopicStore();

  const { loading } = useRequest(async () => {
    const query: GetPagedSubTopicRequest = {
      searchProp: '',
      searchKey: '',
      page: 1,
      size: 100,
      orderOn: '',
      isAscending: true,
    }
    await getCompletedSubTopics();
    await getSubTopics(topicId!, query);
    await getTopic(topicId!);
  }, {
    refreshDeps: [topicId]
  })

  return (
    <div className='flex flex-col-reverse md:flex-row gap-4 h-full'>
      {
        loading
          ?
          (
            <div className='h-full w-full flex justify-center items-center'>
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
                <div className="w-full md:w-8/12 rounded-xl bg-gray-100 overflow-auto h-[calc(100vh-134px)] scroll-smooth">

                  <SubTopicRoadMap />

                </div>

                <div className='w-full md:w-4/12 flex flex-col border-dashed border-red-50 rounded-xl mt-4 md:mt-0'>

                  <SubTopicDetail />

                </div>
              </>
            )
      }

    </div>
  )
}

export default Page
