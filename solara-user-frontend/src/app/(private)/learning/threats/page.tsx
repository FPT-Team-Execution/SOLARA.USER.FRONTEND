"use client"

import EventPredictionDisplay, { DisasterRisk } from "@/components/ThreatPage/EventPredictionDisplay"
import InputEventForm from "@/components/ThreatPage/InputEventForm"
import CommingSoon from "@/components/ui/CommingSoon"
import { useState } from "react"

const Page = () => {

  const [data, setData] = useState<DisasterRisk[]>([]);

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className="w-full md:w-2/6">
        <InputEventForm setData={setData} />
      </div>
      <div className="w-full md:w-4/6 h-full">
        <EventPredictionDisplay data={data} />
      </div>
    </div>
  )
}

export default Page
