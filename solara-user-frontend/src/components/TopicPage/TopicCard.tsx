import { TopicDto } from '@/types/topic'
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
                    className="w-full min-h-28 max-h-28 object-cover rounded-tl-xl rounded-tr-xl"
                    src={props.topic.thumbnail}
                    alt="Topic"
                    width={1920}
                    height={1080}
                />
            }


            <div className="p-2">

                <h2 className="text-left text-xl font-semibold text-green-600">{props.topic.topicName}</h2>
                <p className="text-left text-sm min-h-10 text-gray-500">{props.topic.description}</p>

                <div className="flex gap-2 mt-4 justify-between items-center">
                    <button className="bg-yellow-300 text-black px-2 py-1 font-semibold rounded-lg text-sm">
                        {props.topic.totalSubTopic} Bài học
                    </button>
                    <span className="text-xs text-gray-500 italic">
                        {new Date(props.topic.createdOn || '').toLocaleDateString('vi-VN')}
                    </span>
                </div>

            </div>

        </div>
    )
}

export default TopicCard
