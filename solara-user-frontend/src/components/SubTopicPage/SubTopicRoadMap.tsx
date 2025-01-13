import useSubTopicStore from '@/zustand/useSubTopicStore'
import { useRequest } from 'ahooks';
// import { FaRegFlag } from 'react-icons/fa';
import RoadMap from './RoadMap';
import useTopicStore from '@/zustand/useTopicStore';
import { Button } from 'antd';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { LEARNING_TOPICS_ROUTE } from '@/constants/routes';

const SubTopicRoadMap = () => {

    const { subTopic, subTopics, setSubTopic } = useSubTopicStore();
    const { topic } = useTopicStore();
    const router = useRouter();

    const { } = useRequest(async () => {
        if (subTopics?.items[0].id) {
            setSubTopic(subTopics?.items[0])
        }
    })

    return (
        <div className="bg-gray-100 w-full gap-8 flex flex-col justify-center items-center py-10">

            <div className="flex w-5/6 gap-4 rounded-lg text-black items-center">
                <Button
                    onClick={() => router.push(LEARNING_TOPICS_ROUTE)}
                    className="!w-12 !h-12 flex items-center justify-center !bg-yellow-300 !text-white !rounded-md"
                >
                    <ArrowLeftIcon className="text-black" />
                </Button>
                <div className='flex flex-col items-start'>
                    <h1 className='text-2xl font-bold'>Chủ đề <span className='text-green-600'>{topic?.topicName}</span></h1>
                    <p className='text-gray-600'>{topic?.description}</p>
                </div>
            </div>

            <div className="flex w-full flex-col items-center">

                {subTopics?.items.map((item, index) => {

                    const even: boolean = index % 2 == 0;

                    return (
                        <>
                            <div key={index} className={`flex w-4/6 flex-col   ${even ? "items-start" : "items-end"}`}>
                                <div onClick={() => setSubTopic(item)} className={`flex rounded-full ${item.id === subTopic?.id ? "bg-green-600" : "bg-slate-200"} ${even ? "pr-2" : "flex-row-reverse pl-2"} gap-2 items-center justify-center cursor-pointer`}>
                                    <div className="w-20 h-20 bg-green-600 rounded-full border-4 border-green-300 flex items-center justify-center relative">
                                        <span className="text-white text-2xl font-bold">★</span>
                                        {/* <div className="absolute top-0 right-0 w-3 h-3 bg-green-700 rounded-full animate-ping"></div> */}
                                    </div>
                                    <p className={`text-nowrap min-w-16 p-2 ${item.id === subTopic?.id ? "text-white" : "text-black"}`}>{item.name}</p>
                                </div>
                            </div>

                            {
                                index === subTopics.items.length - 1 ?
                                    (
                                        <></>
                                    )
                                    :
                                    (
                                        <>
                                            <div>
                                                <RoadMap even={even}></RoadMap>
                                            </div>
                                        </>
                                    )
                            }
                        </>
                    );
                })}

                {/* <div className="flex flex-col items-center">
                    <p className="text-gray-500 p-4">Coming Soon</p>
                    <div className="w-20 h-20 bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">
                            <FaRegFlag />
                        </span>
                    </div>
                </div> */}

            </div>

        </div>

    )
}

export default SubTopicRoadMap
