import useSubTopicStore from '@/zustand/useSubTopicStore'
import { useRequest } from 'ahooks';
// import { FaRegFlag } from 'react-icons/fa';
import sun from '../../../public/sun.png'
import flag from '../../../public/flag.png';
import RoadMap from './RoadMap';
import useTopicStore from '@/zustand/useTopicStore';
import { Button, Popover } from 'antd';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SubTopicDetail from './SubTopicDetail';
import { SubTopicDto } from '@/types/subTopic';

const SubTopicRoadMap = () => {

    const { subTopic, subTopics, setSubTopic, completedSubTopics } = useSubTopicStore();
    const { topic } = useTopicStore();
    const router = useRouter();

    const { } = useRequest(async () => {
        if (!subTopic) {
            if (subTopics?.items[0].id) {
                setSubTopic(subTopics?.items[0])
            }
        }
    })

    const checkSubTopicCompleted = (subTopicId: string): boolean => {
        return completedSubTopics?.some(
            (x) => x.subTopic.topicId == topic?.topicId && x.subTopic.id == subTopicId
        ) ?? false;
    };

    const handleSubTopicClick = (item: SubTopicDto, index: number) => {
        // Kiểm tra nếu bài trước chưa hoàn thành
        if (index > 0 && !checkSubTopicCompleted(subTopics!.items[index - 1].id)) {
            return;
        }

        // Nếu bài học hợp lệ, đặt bài học hiện tại
        setSubTopic(item);
    };

    const checkCurrent = (index: number): boolean => {
        if (!subTopics || !subTopics.items || subTopics.items.length === 0) {
            return false; // Trả về false nếu không có subTopics hoặc danh sách rỗng
        }

        // Nếu subTopic hiện tại đã hoàn thành, trả về false
        if (checkSubTopicCompleted(subTopics.items[index].id)) {
            return false;
        } else {
            // Nếu là subTopic đầu tiên và chưa hoàn thành
            if (index === 0 && !checkSubTopicCompleted(subTopics.items[index].id)) {
                const nextSubTopic = subTopics.items[index + 1];
                return !checkSubTopicCompleted(nextSubTopic.id); // Nếu subTopic tiếp theo chưa hoàn thành thì trả về true
            }

            // Nếu là subTopic cuối cùng và subTopic trước đó đã hoàn thành
            if (index === subTopics.items.length - 1) {
                const preSubTopic = subTopics.items[index - 1];
                return checkSubTopicCompleted(preSubTopic.id); // Nếu subTopic trước đó đã hoàn thành thì trả về true
            }

            // Kiểm tra nếu index hợp lệ (không phải đầu và cuối mảng)
            if (index > 0 && index < subTopics.items.length - 1) {
                const nextSubTopic = subTopics.items[index + 1];
                const preSubTopic = subTopics.items[index - 1];

                return (
                    !checkSubTopicCompleted(nextSubTopic.id) &&
                    checkSubTopicCompleted(preSubTopic.id)
                );
            }
        }



        return false; // Không có subTopic tiếp theo hoặc trước
    };




    return (
        <div className="bg-gray-100 w-full gap-8 flex flex-col justify-center items-center py-10">

            <div className="flex w-5/6 gap-4 rounded-lg text-black items-center">
                <Button
                    onClick={() => router.back()}
                    className="!w-12 hover:!border-green-600 !h-12 flex items-center justify-center !bg-yellow-300 !text-white !rounded-lg"
                >
                    <ArrowLeftIcon className="text-black" />
                </Button>
                <div className='flex flex-col items-start'>
                    <h1 className='text-lg text-left md:text-2xl font-bold'>Chủ đề <span className='text-green-600'>{topic?.topicName}</span></h1>
                    <p className='text-gray-600 hidden md:block'>{topic?.description}</p>
                </div>
            </div>

            <div className="flex w-full flex-col items-center">

                {subTopics?.items.map((item, index) => {

                    const even: boolean = index % 2 == 0;

                    const isCompleted = checkSubTopicCompleted(item.id);

                    const isLocked = index > 0 && !checkSubTopicCompleted(subTopics.items[index - 1].id);

                    const isCurrent = checkCurrent(index)

                    return (
                        <>
                            <Popover key={index} content={(<SubTopicDetail isLocked={isLocked}></SubTopicDetail>)} trigger="click">
                                <div className={`flex w-4/6 flex-col ${even ? "items-start" : "items-end"}`}>
                                    <div
                                        onClick={() => handleSubTopicClick(item, index)}
                                        className={`${isLocked ? 'opacity-50' : 'cursor-pointer duration-300 hover:scale-110 hover:shadow-xl transform-gpu'} 
                    shadow-lg flex rounded-full ${item.id === subTopic?.id ? "bg-green-600 shadow-2xl transform scale-105" : "bg-slate-200"} 
                    ${even ? "md:pr-2" : "flex-row-reverse md:pl-2"} 
                    gap-2 items-center justify-center cursor-pointer transition `}>
                                        <div className="min-w-20 min-h-20 bg-green-600 rounded-full border-4 border-green-300 flex items-center justify-center relative">
                                            <span className={`text-2xl font-bold ${item.id === subTopic?.id ? "text-yellow-300" : "text-white"}`}>★</span>
                                            {
                                                isCompleted && (
                                                    <div className={`${item.id === subTopic?.id && "animate-bounce"} absolute ${even ? "top-[-20px] right-[-20px]" : "top-[-20px] left-[-20px]"}`}>
                                                        <Image src={sun} alt='' width={50} />
                                                    </div>
                                                )
                                            }
                                            {
                                                isCurrent && (
                                                    <div className={`${item.id === subTopic?.id && "animate-bounce"} absolute ${even ? "top-[-20px] right-[-20px]" : "top-[-20px] right-[-20px]"}`}>
                                                        <Image src={flag} alt='' width={50} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <p className={`min-w-16 hidden md:block p-2 ${item.id === subTopic?.id ? "text-white" : "text-black"}`}>{item.name}</p>
                                    </div>
                                </div>

                            </Popover>
                            {
                                index === subTopics.items.length - 1 ?
                                    (
                                        <></>
                                    )
                                    :
                                    (
                                        <>
                                            <div key={index} className='w-1/2'>
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
