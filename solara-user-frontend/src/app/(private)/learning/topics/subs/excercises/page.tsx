"use client"

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
    <div>
      This is excercise page
    </div>
  )
}

export default Page
