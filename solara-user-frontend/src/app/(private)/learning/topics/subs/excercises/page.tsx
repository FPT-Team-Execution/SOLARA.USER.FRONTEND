"use client"

import { useSearchParams } from "next/navigation";


const Page = () => {

  const searchParams = useSearchParams();
  const subTopicId = searchParams.get('subTopicId');

  return (
    <div>
      This is excercise page
      {subTopicId}
    </div>
  )
}

export default Page
