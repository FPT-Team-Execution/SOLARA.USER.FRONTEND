import { AnswerDto, AttemptResponse, CreateUserAttemptRequest, ExcerciseDto } from '@/types/excercise';
import useExcerciseStore from '@/zustand/useExcerciseStore'
import { useRequest } from 'ahooks';
import { Button, Modal, Progress } from 'antd';
import { useState } from 'react'
import { MdOutlineDone } from 'react-icons/md';
import Flashcard from './Flashcard';
import { ExcerciseType } from '@/enums/excerciseType';
import BestChoice from './BestChoice';
import SituationChoice from './SituationChoice';
import TrueFalse from './TrueFalse';
import { getCookie } from 'cookies-next';
import axiosClient from '@/utils/axios/axiosClient';
import { IBaseModel } from '@/interfaces/general';
import { POST_ATTEMPT_EXCERCISE_API, POST_COMPLETION_SUBTOPIC_API } from '@/constants/apis';
import AnswerResult from './AnswerResult';
import CompleteResult from './CompleteResult';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import useSubTopicStore from '@/zustand/useSubTopicStore';
import { useRouter, useSearchParams } from 'next/navigation';
import useUserStore from '@/zustand/useUserStore';

const ExcerciseSpace = () => {

    const searchParams = useSearchParams();

    const { getUserLevel } = useUserStore();

    const [isAttemptModalOpen, setIsAttemptModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

    const showAttemptModal = () => {
        setIsAttemptModalOpen(true);
    };

    const handleAttemptModalOk = () => {
        navigateNext()
        setIsAttemptModalOpen(false);
    };

    const showCompleteModal = () => {
        setIsCompleteModalOpen(true);
    };

    const handleCompleteModalOk = () => {
        if (completeResult?.isSuccess) {
            setNo(0);
        }
        setAttempted(false);
        setIsCompleteModalOpen(false);
    };

    const [completeLoading, setCompleteLoading] = useState<boolean>(false);
    const [attemptLoading, setAttemptLoading] = useState<boolean>(false);
    const [attempted, setAttempted] = useState(false);
    const [excercise, setExcercise] = useState<ExcerciseDto>();
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [attemptResult, setAttemptResult] = useState<AttemptResponse>();
    const [completeResult, setCompleteResult] = useState<IBaseModel<string>>();
    const [flip, setFlip] = useState<boolean>(false);
    const [no, setNo] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const { excercises } = useExcerciseStore();
    const { subTopic, getSubTopic } = useSubTopicStore();
    const router = useRouter();

    const { } = useRequest(async () => {

        if (!excercises || !excercises.items || !excercises.items[no]) {
            return;
        }

        if (!subTopic) {
            const subTopicId = searchParams.get('subTopicId');
            if (subTopicId) {
                await getSubTopic(subTopicId)
            }
        }

        setExcercise(excercises.items[no])
        calculateProgress();

        if (no === excercises.total - 1) {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    }, {
        refreshDeps: [no]
    });

    const handleFlip = async () => {

        setFlip((prev) => !prev);

        if (attempted) {
            return;
        }

        try {
            const exerciseId = excercise?.id;
            const answerId = excercise?.ans?.[0]?.id;

            if (!exerciseId || !answerId) {
                return;
            }

            const userId = getCookie('__appUserId') as string;
            if (!userId) {
                return;
            }

            const request: CreateUserAttemptRequest = {
                options: [answerId],
                userId,
            };

            await axiosClient.post<IBaseModel<AttemptResponse[]>>(
                POST_ATTEMPT_EXCERCISE_API(exerciseId),
                request
            );

            setAttempted(true);
        } catch {
        }
    };

    const calculateProgress = () => {
        if (excercises?.total === undefined) {
            return;
        }
        const progress = no / (excercises?.total - 1) * 100
        setProgress(progress);
    }

    const navigateNext = () => {

        if (!excercises || no >= (excercises.total || 0) - 1) {
            return;
        }

        setFlip(false);
        setAttempted(false);
        setNo((prev) => prev + 1);

    };

    const navigatePrev = () => {

        if (no <= 0) {
            return
        }
        setFlip(false)
        setNo((prev) => prev - 1)
    }

    const handleComplete = async () => {
        try {
            showCompleteModal();
            setCompleteLoading(true);

            const appUserId = getCookie('__appUserId');
            const response = await axiosClient.post<IBaseModel<string>>(POST_COMPLETION_SUBTOPIC_API(excercise!.subTopicId), appUserId)

            if (response.data) {
                await getUserLevel()
            }

            setCompleteResult(response.data);
            setCompleteLoading(false);
        } catch {
        }
    }

    const handleAttempt = async (answer: AnswerDto) => {
        showAttemptModal()
        setAttemptLoading(true);
        const request: CreateUserAttemptRequest = {
            options: [answer.id],
            userId: getCookie('__appUserId') as string,
        };

        try {
            const response = await axiosClient.post<IBaseModel<AttemptResponse[]>>(
                POST_ATTEMPT_EXCERCISE_API(excercise!.id),
                request
            );

            if (response.data?.responseRequest && response.data.responseRequest.length > 0) {
                const result = response.data.responseRequest[0];

                setAttemptResult(result);

            } else {
                console.warn('responseRequest is empty or undefined');
            }

            setAttemptLoading(false);
        } catch (error) {
            console.error('Error during attempt:', error);
        }
    };

    return (

        <div className='flex w-full h-full flex-col gap-4'>
            <Modal closable={false} loading={completeLoading} centered title="Kết quả" okText={completeResult?.isSuccess ? 'Ôn lại' : 'Học tiếp'} okButtonProps={{ style: { backgroundColor: 'green' } }} cancelButtonProps={{ style: { display: 'none' } }} open={isCompleteModalOpen} onOk={handleCompleteModalOk}>
                <CompleteResult completeResult={completeResult!} />
            </Modal>
            <Modal closable={false} loading={attemptLoading} centered title="Kết quả" okText={'Tiếp tục'} okButtonProps={{ style: { backgroundColor: 'green' } }} cancelButtonProps={{ style: { display: 'none' } }} open={isAttemptModalOpen} onOk={handleAttemptModalOk}>
                <AnswerResult attemptResult={attemptResult} />
            </Modal>

            <div className="flex w-5/6 gap-4 rounded-lg text-black items-center">
                <Button
                    onClick={() => router.back()}
                    className="!w-12 !h-12 flex items-center justify-center !bg-yellow-300 !text-white !rounded-lg"
                >
                    <ArrowLeftIcon className="text-black" />
                </Button>
                <div className='flex flex-col items-start'>
                    <h1 className='text-lg md:text-2xl font-bold text-left'><span className='text-green-600'>{subTopic?.name}</span></h1>
                </div>
            </div>

            {
                excercise?.exerciseTypeId == ExcerciseType.flashcard
                    ?
                    <Flashcard excercise={excercise!} flip={flip} handleFlip={handleFlip} />
                    :
                    excercise?.exerciseTypeId == ExcerciseType.bestChoice
                        ?
                        <BestChoice handleAttempt={handleAttempt} excercise={excercise!} />
                        :
                        excercise?.exerciseTypeId == ExcerciseType.situationChoice
                            ?
                            <SituationChoice handleAttempt={handleAttempt} excercise={excercise} />
                            :
                            excercise?.exerciseTypeId == ExcerciseType.trueFalse
                                ?
                                <TrueFalse handleAttempt={handleAttempt} excercise={excercise} />
                                :
                                <h1>Chế độ học đang được phát triển...</h1>
            }
            <div className='flex flex-col w-full gap-4 justify-center items-center'>
                <div className='w-full'>
                    <Progress percent={progress} percentPosition={{ align: 'center', type: 'inner' }} strokeColor="green" showInfo={false} style={{ width: '100%' }} />
                </div>
                <div className='flex w-full gap-4'>
                    <Button className='!w-5/12 !h-14 !rounded-lg' onClick={navigatePrev}>Trở về</Button>
                    <Button onClick={handleComplete} disabled={!isComplete} className='!w-2/12 !h-14 !rounded-lg' icon={<MdOutlineDone />}></Button>
                    <Button className='!w-5/12 !h-14 !rounded-lg' onClick={navigateNext}>Kế tiếp</Button>
                </div>
            </div>
        </div>
    )
}

export default ExcerciseSpace
