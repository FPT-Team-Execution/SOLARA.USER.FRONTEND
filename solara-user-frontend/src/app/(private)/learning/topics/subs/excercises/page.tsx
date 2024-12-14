"use client"

import Advertisement from "@/components/ExcercisePage/Advertisement";
import ExcerciseList from "@/components/ExcercisePage/ExcerciseList";
import Flashcard from "@/components/ExcercisePage/Flashcard";
import Spinner from "@/components/UI/Spinner";
import { GetPagedSubTopicRequest } from "@/types/subTopic";
import useExcerciseStore from "@/zustand/useExcerciseStore";
import { useRequest } from "ahooks";
import { useSearchParams } from "next/navigation";


const Page = () => {

  const searchParams = useSearchParams();
  const subTopicId = searchParams.get('subTopicId');

  const { excercises, getExcercises } = useExcerciseStore();

  const { loading } = useRequest(async () => {
    const query: GetPagedSubTopicRequest = {
      searchProp: '',
      searchKey: '',
      page: 1,
      size: 100,
      orderOn: '',
      isAscending: true,
    }
    await getExcercises(subTopicId!, query);
  })

  console.log(excercises);

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
          excercises === null
            ?
            (
              <span>There is no sub topic</span>
            )
            :
            (
              <>
                <div className="w-8/12 bg-red-100 rounded-xl overflow-auto max-h-screen scroll-smooth">
                  <Flashcard />
                </div>

                <div className='flex flex-col border-dashed border-red-50 w-4/12 rounded-xl gap-4'>

                  <div className="bg-green-100 h-4/6 rounded-xl">
                    <ExcerciseList />
                  </div>

                  <div className="bg-yellow-100 h-2/6 rounded-xl">
                    <Advertisement />
                  </div>

                </div>
              </>
            )
      }

    </div>
  )
}

export default Page
