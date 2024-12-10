import useSubTopicStore from '@/zustand/useSubTopicStore'
import { Button } from 'antd';
import React from 'react'
import { AiTwotoneExperiment } from 'react-icons/ai';
import { TbCards } from 'react-icons/tb';

const SubTopicDetail = () => {
    const { subTopic } = useSubTopicStore();

    return (
        <div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <img src="https://via.placeholder.com/400x200.png?text=Storm" alt="Storm" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h2 className="text-2xl font-bold mb-2">{subTopic?.name}</h2>
                <p className="text-gray-700 text-sm">{subTopic?.description}</p>

                <div className="flex justify-center w-full gap-4 mt-4">
                    <div className="bg-blue-500 hover:bg-blue-700 w-3/6 flex gap-1 justify-center items-center text-white font-bold px-4 py-2 rounded text-lg">
                        {subTopic?.totalExcercise}<TbCards />

                    </div>
                    <div className="bg-yellow-500 hover:bg-yellow-700 flex w-3/6 gap-1 justify-center items-center text-white font-bold px-4 py-2 rounded text-lg">
                        {subTopic?.totalXP} <AiTwotoneExperiment />
                    </div>
                </div>

                <div>
                    <Button className='w-full !py-6 !font-bold !text-lg !bg-green-600 !text-white'>Học Ngay</Button>
                </div>

            </div>
        </div>
    )
}

export default SubTopicDetail
