import { AnswerDto, AttemptResponse, CreateUserAttemptRequest, ExcerciseDto } from '@/types/excercise';
import useExcerciseStore from '@/zustand/useExcerciseStore'
import useSubTopicStore from '@/zustand/useSubTopicStore';
import { useRequest } from 'ahooks';
import { Button, Modal, Progress } from 'antd';
import { useState } from 'react'
import { MdOutlineDone } from 'react-icons/md';
import Flashcard from './Flashcard';
import { excerciseType } from '@/enums/excerciseType';
import BestChoice from './BestChoice';
import SituationChoice from './SituationChoice';
import TrueFalse from './TrueFalse';
import { getCookie } from 'cookies-next';
import axiosClient from '@/utils/axios/axiosClient';
import { IBaseModel } from '@/interfaces/general';
import { POST_ATTEMPT_EXCERCISE_API } from '@/constants/apis';
import AnswerResult from './AnswerResult';

const ExcerciseSpace = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        navigateNext()
        setIsModalOpen(false);
    };

    const [attemptLoading, setAttemptLoading] = useState<boolean>(false);

    const { excercises } = useExcerciseStore();
    const [excercise, setExcercise] = useState<ExcerciseDto>();
    const { completeSubTopic } = useSubTopicStore();
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [attemptResult, setAttemptResult] = useState<AttemptResponse>();
    const [flip, setFlip] = useState<boolean>(false);
    const [no, setNo] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    const { } = useRequest(async () => {

        if (!excercises || !excercises.items || !excercises.items[no]) {
            return;
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

    const handleFlip = () => {
        setFlip(!flip)
    }

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
        await completeSubTopic(excercise!.subTopicId!);
    }

    const handleAttempt = async (answer: AnswerDto) => {
        showModal()
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

        <div className='flex w-full h-full flex-col'>
            <Modal closable={false} loading={attemptLoading} centered title="Kết quả" okText={'Tiếp tục'} okButtonProps={{ style: { backgroundColor: 'green' } }} cancelButtonProps={{ style: { display: 'none' } }} open={isModalOpen} onOk={handleOk}>
                <AnswerResult attemptResult={attemptResult} />
            </Modal>
            {
                excercise?.exerciseTypeId == excerciseType.flashcard
                    ?
                    <Flashcard excercise={excercise!} flip={flip} handleFlip={handleFlip} />
                    :
                    excercise?.exerciseTypeId == excerciseType.bestChoice
                        ?
                        <BestChoice handleAttempt={handleAttempt} excercise={excercise!} />
                        :
                        excercise?.exerciseTypeId == excerciseType.situationChoice
                            ?
                            <SituationChoice handleAttempt={handleAttempt} excercise={excercise} />
                            :
                            excercise?.exerciseTypeId == excerciseType.trueFalse
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
                    <Button className='!w-5/12 !h-14' onClick={navigatePrev}>Trở về</Button>
                    <Button onClick={handleComplete} disabled={!isComplete} className='!w-2/12 !h-14' icon={<MdOutlineDone />}></Button>
                    <Button className='!w-5/12 !h-14' onClick={navigateNext}>Kế tiếp</Button>
                </div>
            </div>
        </div>
    )
}

export default ExcerciseSpace
