import { LEARNING_TOPICS_SUBS_ROUTE } from '@/constants/routes'
import { TopicOfUserDto } from '@/types/topic'
import checkmark from '../../../public/checkmark.png';
import fastForward from '../../../public/fast-forward.png';
import Link from 'next/link'
import Image from 'next/image';
import { TopicOfUserStatusEnum } from '@/enums/userTopicStatus';

interface IProps {
    userTopic: TopicOfUserDto
    buttonTitle: string
    status: TopicOfUserStatusEnum
}

const TopicCardLite = ({ userTopic, buttonTitle, status }: IProps) => {

    const handleShowStatus = () => {
        switch (status) {
            case TopicOfUserStatusEnum.Completed: {
                return (
                    <Image
                        className="absolute top-[-10px] left-[-15px]"
                        width={30}
                        height={30}
                        src={checkmark}
                        alt=""
                    />
                )
            }
            case TopicOfUserStatusEnum.InProgress: {
                return (
                    <Image
                        className="absolute top-[-10px] left-[-15px]"
                        width={30}
                        height={30}
                        src={fastForward}
                        alt=""
                    />
                )
            }
        }
    }

    return (
        <div className="relative max-w-sm p-4 flex items-center gap-4 bg-white border shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">

            {handleShowStatus()}

            <h5 className="text-left font-bold tracking-tight text-gray-900">
                {userTopic.topicName}
            </h5>

            <Link
                href={`${LEARNING_TOPICS_SUBS_ROUTE}?topicId=${userTopic.topicId}`}
                className="inline-flex items-center px-3 py-2 text-sm text-center text-white bg-green-600 rounded"
            >
                {buttonTitle}
                <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </Link>
        </div>


    )
}

export default TopicCardLite
