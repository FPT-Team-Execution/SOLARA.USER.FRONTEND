import { ExcerciseDto } from '@/types/excercise';
import useExcerciseStore from '@/zustand/useExcerciseStore'
import useSubTopicStore from '@/zustand/useSubTopicStore';
import { useRequest } from 'ahooks';
import { Button, Progress } from 'antd';
import { useState } from 'react'
import { MdOutlineDone } from 'react-icons/md';
import Flashcard from './Flashcard';
import { excerciseType } from '@/enums/excerciseType';
import BestChoice from './BestChoice';
import SituationChoice from './SituationChoice';
import TrueFalse from './TrueFalse';

const ExcerciseSpace = () => {

    const { excercises } = useExcerciseStore();
    const [excercise, setExcercise] = useState<ExcerciseDto>();
    const { completeSubTopic } = useSubTopicStore();
    const [isComplete, setIsComplete] = useState<boolean>(false);

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

    return (
        <div className='flex w-full h-full flex-col'>
            {
                excercise?.exerciseTypeId == excerciseType.flashcard
                    ?
                    <Flashcard excercise={excercise!} flip={flip} handleFlip={handleFlip} />
                    :
                    excercise?.exerciseTypeId == excerciseType.bestChoice
                        ?
                        <BestChoice excercise={excercise!} />
                        :
                        excercise?.exerciseTypeId == excerciseType.situationChoice
                            ?
                            <SituationChoice excercise={excercise} />
                            :
                            excercise?.exerciseTypeId == excerciseType.trueFalse
                                ?
                                <TrueFalse excercise={excercise} />
                                :
                                <h1>Chế độ học đang được phát triển...</h1>

            }
            <div className='flex flex-col w-full !h-1/6 gap-4 justify-center items-center'>
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
