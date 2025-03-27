"use client"

import EventPredictionDisplay from "@/components/ThreatPage/EventPredictionDisplay"
import InputEventForm from "@/components/ThreatPage/InputEventForm"
import { LEARNING_PACKAGES_ROUTE } from "@/constants/routes"
import { LocationPrediction } from "@/types/prediction"
import useUserStore from "@/zustand/useUserStore"
import { useRequest } from "ahooks"
import { notification } from "antd"
import { useRouter } from 'next/navigation';
import { useState } from "react"

const Page = () => {

  const [data, setData] = useState<LocationPrediction[]>([]);
  const router = useRouter();
  const { userSubcriptions, getUserSubsctiptions } = useUserStore();
  const { } = useRequest(async () => {
    await getUserSubsctiptions();

    if (userSubcriptions == null || userSubcriptions.length == 0) {
      notification.warning({
        message: 'Chức năng chưa mở khóa!',
        description: "Bạn cần mua gói để tiếp tục!"
      })
      router.push(LEARNING_PACKAGES_ROUTE)
      return
    }

    const duration = Math.max(
      0,
      Math.ceil(
        (new Date(userSubcriptions![0].endDate).getTime() -
          new Date().getTime()) /
        (1000 * 60 * 60 * 24)
      )
    )

    console.log(duration)

    if (duration <= 0) {
      notification.warning({
        message: 'Gói đã hết hạn!',
        description: "Bạn cần gia hạn gói để tiếp tục!"
      })
      router.push(LEARNING_PACKAGES_ROUTE)
      return
    }
  });


  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className="w-full md:w-3/6">
        <InputEventForm setData={setData} />
      </div>
      <div className="w-full md:w-3/6 h-full">
        <EventPredictionDisplay data={data} />
      </div>
    </div>
  )
}

export default Page
