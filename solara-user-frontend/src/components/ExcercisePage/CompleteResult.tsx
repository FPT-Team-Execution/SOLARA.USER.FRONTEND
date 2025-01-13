import { IBaseModel } from '@/interfaces/general';
import sunHappy from '../../../public/sun.png';
import moonSad from '../../../public/unhappy.png';
import Image from 'next/image';

interface IProps {
    completeResult: IBaseModel<string>;
}

const CompleteResult = ({ completeResult }: IProps) => {
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
        <div className={`p-6 rounded-lg shadow-md border ${containerClass} flex items-center space-x-4`}>
            <Image
                src={icon}
                alt="Status Icon"
                width={50}
                height={50}
                className="flex-shrink-0"
            />
            <div className="text-lg font-semibold leading-relaxed">
                {message}
            </div>
        </div>
    );
};

export default CompleteResult;
