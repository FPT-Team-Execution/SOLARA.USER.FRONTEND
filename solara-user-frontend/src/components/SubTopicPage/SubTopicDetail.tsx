import { LEARNING_TOPICS_SUBS_EXCERCISES_ROUTE } from '@/constants/routes';
import useSubTopicStore from '@/zustand/useSubTopicStore'
import { Button } from 'antd';
import { useRouter } from 'next/navigation'
import { AiTwotoneExperiment } from 'react-icons/ai';
import { TbCards } from 'react-icons/tb';
import { VscDebugStart } from 'react-icons/vsc';

const SubTopicDetail = () => {
    const { subTopic } = useSubTopicStore();
    const router = useRouter();

    const handleNavigate = (): void => {
        router.push(`${LEARNING_TOPICS_SUBS_EXCERCISES_ROUTE}?subTopicId=${subTopic?.id}`)
    }

    return (
        <div>
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

                    <div>
                        <Button icon={<VscDebugStart />} onClick={handleNavigate} className='w-full !py-6 !font-bold !text-lg !bg-green-600 !text-white'>Học Ngay</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SubTopicDetail
