import { IBaseModel } from '@/interfaces/general';
import sunHappy from '../../../public/sun.png';
import moonSad from '../../../public/unhappy.png';
import Image from 'next/image';
import { Button } from 'antd';
import useUserStore from '@/zustand/useUserStore';
import { getLevelDescription } from '@/utils/string/userLevelFormat';
import { UserLevel } from '@/enums/userLevel';

interface IProps {
    completeResult: IBaseModel<string>;
    handleRestart: () => void;
    handleNextLesson: () => void
}

const CompleteResult = ({ completeResult, handleNextLesson, handleRestart }: IProps) => {

    const { userLevel } = useUserStore();

    const containerClass = completeResult.isSuccess
        ? 'bg-green-50 border-green-400 text-green-800'
        : 'bg-red-50 border-red-400 text-red-800';

    const icon = completeResult.isSuccess ? sunHappy : moonSad;
    const message = completeResult.isSuccess
        ? (
            <>
                Chúc mừng bạn đã hoàn thành. <br />
                Tiếp tục học tập nhé!
            </>
        )
        : (
            <>
                Bạn vẫn còn bài chưa học. <br />
                Hãy chăm chỉ nhé!
            </>
        );

    return (
        <div className={`p-6 rounded-lg shadow-md border ${containerClass} flex flex-col items-center space-y-4`}>
            <div className='w-24 h-auto'>
                <Image
                    src={icon}
                    alt="Status Icon"
                    width={500}
                    height={500}
                    className="flex-shrink-0 w-full"
                />
            </div>
            <div className="text-lg text-center font-semibold leading-relaxed">
                {message}
            </div>
            {
                completeResult.isSuccess &&
                <div className="flex flex-col w-full p-4 bg-white shadow rounded-lg">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>{getLevelDescription(userLevel?.currentLevel as keyof typeof UserLevel)}</span>
                        <span>{getLevelDescription(userLevel?.nextLevel as keyof typeof UserLevel)}</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 relative">
                        <div
                            className="bg-yellow-400 h-2.5 rounded-full"
                            style={{ width: `${userLevel!.currentXp / userLevel!.thresholdXp * 100}%` }}
                        ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                        {userLevel?.currentXp}/{userLevel?.thresholdXp} XP
                    </div>
                </div>
            }
            <div className='flex w-full gap-4 items-center justify-center'>
                <Button className='!font-semibold !w-4/12 hover:!border-green-600 hover:!text-green-600 !h-12 !rounded-lg' onClick={handleRestart}>{completeResult.isSuccess ? 'Ôn lại' : 'Học tiếp'}</Button>
                {
                    completeResult.isSuccess &&
                    <Button className='!font-semibold !w-4/12 !text-white !bg-green-600 hover:!border-green-600  hover:!text-white !h-12 !rounded-lg' onClick={handleNextLesson}>Tiếp theo</Button>
                }
            </div>
        </div>
    );
};

export default CompleteResult;
