import { Calendar } from "antd"


const ExcerciseList = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
        <Calendar className="w-full h-full" fullscreen={false} />
    </div>
  )
}

export default ExcerciseList
