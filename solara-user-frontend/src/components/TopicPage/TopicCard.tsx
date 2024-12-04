import { TopicDto } from '@/types/topic'
import { formatDateTime } from '@/utils/dateTime/formatDateTime'
import React from 'react'

interface IProps {
    topic: TopicDto
}

const TopicCard = (props: IProps) => {
    return (
        <div className="bg-white shadow-lg rounded-xl">

            <img
                className="w-full h-48 object-cover rounded-tl-xl rounded-tr-xl"
                src="https://via.placeholder.com/400x200.png?text=Storm"
                alt="Storm"
            />

            <div className="p-2">

                <div className="text-xs text-gray-600 flex justify-between">
                    <p>Admin</p>
                    <span>{formatDateTime(props.topic.createdOn!.toString()!)}</span>
                </div>

                <h2 className="text-left text-xl font-semibold text-purple-600 mt-4">{props.topic.topicName}</h2>
                <p className="text-left text-sm text-gray-500">{props.topic.description}</p>

                <div className="flex gap-2 mt-4">
                    <button className="bg-purple-500 text-white px-2 rounded-lg text-sm">
                        Thiên tai
                    </button>
                    <button className="bg-purple-200 text-purple-600 px-2 rounded-lg text-sm">
                        Kĩ năng cơ bản
                    </button>
                </div>

            </div>
            
        </div>
    )
}

export default TopicCard
