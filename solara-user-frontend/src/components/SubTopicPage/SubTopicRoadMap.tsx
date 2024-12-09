import useSubTopicStore from '@/zustand/useSubTopicStore'
import React from 'react'
import { VscDebugStart } from 'react-icons/vsc';

const SubTopicRoadMap = () => {

    const { subTopics } = useSubTopicStore();

    return (
        <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center py-10">
            <div className="flex w-full flex-col items-center gap-8">

                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">
                            <VscDebugStart />
                        </span>
                    </div>
                    <p className="text-gray-500">BẮT ĐẦU</p>
                </div>

                <div className="w-1 h-12 bg-gray-600"></div>

                {subTopics?.items.map((item, index) => {

                    const even: boolean = index % 2 == 0;
                    console.log(index)
                    console.log(even);

                    return (
                        <>
                            <div key={index} className={`flex w-4/6 flex-col   ${even ? "items-start" : "items-end"}`}>
                                <div className={`flex ${even ? "" : "flex-row-reverse"} gap-2 items-center justify-center`}>
                                    <div className="w-20 h-20 bg-green-600 rounded-full border-4 border-green-300 flex items-center justify-center relative">
                                        <span className="text-white text-2xl font-bold">★</span>
                                        {/* <div className="absolute top-0 right-0 w-3 h-3 bg-green-700 rounded-full animate-ping"></div> */}
                                    </div>
                                    <button className="text-green-500">{item.name}</button>
                                </div>
                            </div>

                            <div className="w-1 h-12 bg-gray-600"></div>
                        </>
                    );
                })}

                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">★</span>
                    </div>
                    <p className="text-gray-500">Coming Soon</p>
                </div>

            </div>

        </div>

    )
}

export default SubTopicRoadMap
