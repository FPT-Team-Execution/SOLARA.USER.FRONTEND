import { LEARNING_TOPICS_SUBS_EXCERCISES_ROUTE } from '@/constants/routes';
import useSubTopicStore from '@/zustand/useSubTopicStore'
import { Button, notification } from 'antd';
import { useRouter } from 'next/navigation'
import { AiTwotoneExperiment } from 'react-icons/ai';
import { IoLockClosed } from 'react-icons/io5';
import { TbCards } from 'react-icons/tb';
import { VscDebugStart } from 'react-icons/vsc';

interface IProps {
    isLocked?: boolean;
}

const SubTopicDetail = ({ isLocked }: IProps) => {
    const { subTopic } = useSubTopicStore();
    const router = useRouter();

    const handleNavigate = (): void => {
        if (isLocked) {
            notification.warning({
                message: 'Bài học bị khóa',
                description: 'Vui lòng hoàn thành bài học trước để tiếp tục.',
            });
            return;
        }
        router.push(`${LEARNING_TOPICS_SUBS_EXCERCISES_ROUTE}?subTopicId=${subTopic?.id}`)
    }

    return (
        <>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-2">{subTopic?.name}</h2>
                <p className="text-gray-700 text-sm">{subTopic?.description}</p>

                <div className='flex gap-4 flex-col'>
                    <div className="flex justify-center w-full mt-4 gap-4">
                        <div className="bg-blue-500 w-3/6 flex gap-1 justify-center items-center text-white font-bold px-4 py-2 rounded text-lg">
                            {subTopic?.totalExcercise}<TbCards />

                        </div>
                        <div className="bg-yellow-500 flex w-3/6 gap-1 justify-center items-center text-white font-bold px-4 py-2 rounded text-lg">
                            {subTopic?.totalXP} <AiTwotoneExperiment />
                        </div>
                    </div>

                    <div >
                        <Button icon={!isLocked ? <VscDebugStart /> : <IoLockClosed />} onClick={() => handleNavigate()} className={`w-full !text-lg !font-bold !py-6 ${!isLocked ? '!bg-green-600 !text-white' : 'hover:!border-gray-300 !bg-gray-200 !text-gray-400 !cursor-not-allowed'}`}>{!isLocked ? 'Học Ngay' : 'Khóa'}</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SubTopicDetail
