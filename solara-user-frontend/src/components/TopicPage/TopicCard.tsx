import { TopicDto } from '@/types/topic'
import { formatDateTime } from '@/utils/dateTime/formatDateTime'
import Image from 'next/image'

interface IProps {
    topic: TopicDto
}

const TopicCard = (props: IProps) => {
    return (
        <div className="bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">

            {
                props.topic.thumbnail &&
                <Image
                    className="w-full min-h-32 max-h-32 object-cover rounded-tl-xl rounded-tr-xl"
                    src={props.topic.thumbnail}
                    alt="Topic"
                    width={1920}
                    height={1080}
                />
            }


            <div className="p-2">

                <div className="text-xs text-gray-600 flex justify-between">
                    <p>Admin</p>
                    <span>{formatDateTime(props.topic.createdOn!.toString()!)}</span>
                </div>

                <h2 className="text-left text-xl font-semibold text-green-600 mt-4">{props.topic.topicName}</h2>
                <p className="text-left text-sm min-h-10 text-gray-500">{props.topic.description}</p>

                <div className="flex gap-2 mt-4">
                    <button className="bg-green-500 text-white px-2 rounded-lg text-sm">
                        Thiên tai
                    </button>
                    <button className="bg-green-200 text-green-600 px-2 rounded-lg text-sm">
                        Kĩ năng cơ bản
                    </button>
                </div>

            </div>

        </div>
    )
}

export default TopicCard
