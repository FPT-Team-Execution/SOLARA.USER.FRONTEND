import { ExcerciseDto } from '@/types/excercise';
import useExcerciseStore from '@/zustand/useExcerciseStore'
import useSubTopicStore from '@/zustand/useSubTopicStore';
import { useRequest } from 'ahooks';
import { Button, Progress } from 'antd';
import { useState } from 'react'
import { MdOutlineDone } from 'react-icons/md';

const Flashcard = () => {

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

        // const id = excercises.items[no].id;

        // if (id == null) {
        //     return;
        // }

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
            <div onClick={handleFlip} className="group h-5/6 w-full [perspective:1000px] cursor-pointer">
                <div className={`relative h-full w-full rounded-xl bg-gray-200 transition-all duration-500 [transform-style:preserve-3d] ${flip ? '[transform:rotateY(180deg)]' : ''}`}>
                    {/* Front Face */}
                    <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
                        <div className="flex min-h-full flex-col items-center justify-center">
                            <h2 className="text-2xl font-bold mb-4">Question</h2>
                            <p className="text-lg text-pretty text-center mb-4">
                                {excercise?.question}
                            </p>
                        </div>
                    </div>
                    {/* Back Face */}
                    <div className="absolute inset-0 h-full w-full rounded-xl px-12 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="flex min-h-full flex-col items-center justify-center">

                            {
                                excercise?.ans[0] === undefined
                                    ?
                                    'No answer'
                                    :
                                    (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Answer</h2>
                                            <p className="text-lg text-pretty text-center mb-4">
                                                {excercise?.ans[0].optionText}
                                            </p>
                                            {
                                                excercise?.ans[0].explanation === undefined
                                                    ?
                                                    <></>
                                                    : (
                                                        <div>
                                                            <h2 className="text-xl font-bold mb-4">Explanation</h2>
                                                            <p className="text-lg text-pretty text-center mb-4">
                                                                {excercise?.ans[0].explanation}
                                                            </p>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    )

                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full h-1/6 gap-4 justify-center items-center'>
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

export default Flashcard
