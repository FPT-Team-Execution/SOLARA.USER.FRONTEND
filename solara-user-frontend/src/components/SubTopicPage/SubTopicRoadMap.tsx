import useSubTopicStore from '@/zustand/useSubTopicStore'
import { useRequest } from 'ahooks';
import React from 'react'
import { FaRegFlag } from 'react-icons/fa';

const SubTopicRoadMap = () => {

    const { subTopic, subTopics, getSubTopic } = useSubTopicStore();

    const { } = useRequest(async () => {
        if (subTopics?.items[0].id) {
            getSubTopic(subTopics?.items[0].id)
        }
    })

    return (
        <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center py-10">
            <div className="flex w-full flex-col items-center">

                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">
                            <FaRegFlag />
                        </span>
                    </div>
                    <p className="text-gray-500">BẮT ĐẦU</p>
                </div>

                {subTopics?.items.map((item, index) => {

                    const even: boolean = index % 2 == 0;

                    return (
                        <>
                            <div key={index} className={`flex w-4/6 flex-col   ${even ? "items-start" : "items-end"}`}>
                                <div onClick={() => getSubTopic(item.id)} className={`flex rounded-full ${item.id === subTopic?.id ? "bg-slate-300" : "bg-slate-200"} ${even ? "pr-2" : "flex-row-reverse pl-2"} gap-2 items-center justify-center cursor-pointer`}>
                                    <div className="w-20 h-20 bg-green-600 rounded-full border-4 border-green-300 flex items-center justify-center relative">
                                        <span className="text-white text-2xl font-bold">★</span>
                                        {/* <div className="absolute top-0 right-0 w-3 h-3 bg-green-700 rounded-full animate-ping"></div> */}
                                    </div>
                                    <p className="text-green-500 text-nowrap">{item.name}</p>
                                </div>
                            </div>

                            {
                                index === subTopics.items.length - 1 ?
                                    (
                                        <></>
                                    )
                                    :
                                    (
                                        <div className={`w-full flex ${even ? "flex-col" : "flex-col-reverse"} justify-evenly items-center`}>

                                            <div className="w-6/12 h-12 flex flex-col items-start">
                                                <div className="w-4 h-12 bg-gray-600"></div>
                                            </div>

                                            <div className={`${even ? "rounded-bl-full rounded-tr-full" : "rounded-br-full rounded-tl-full"} w-6/12 h-4 bg-gray-600`}></div>

                                            <div className="w-6/12 h-12 flex flex-col items-end">
                                                <div className="w-4 h-12 bg-gray-600"></div>
                                            </div>

                                        </div>
                                    )
                            }
                        </>
                    );
                })}

                <div className="flex flex-col items-center">
                    <p className="text-gray-500">Coming Soon</p>
                    <div className="w-20 h-20 bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">
                            <FaRegFlag />
                        </span>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default SubTopicRoadMap
