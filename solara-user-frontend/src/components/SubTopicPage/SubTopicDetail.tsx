import useSubTopicStore from '@/zustand/useSubTopicStore'
import React from 'react'

const SubTopicDetail = () => {
    const { subTopic } = useSubTopicStore();

    return (
        <div>
            <p>{subTopic?.name}</p>
            <p>{subTopic?.description}</p>
            <p>{subTopic?.totalExercise}</p>
            <p>{subTopic?.totalXP}</p>
        </div>
    )
}

export default SubTopicDetail
